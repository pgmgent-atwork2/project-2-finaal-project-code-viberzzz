-- ============================================================
-- AquaControl — filtratie databank schema
-- PostgreSQL / Supabase compatibel
-- ============================================================

-- extensies
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- enums
-- ============================================================

CREATE TYPE unit_status AS ENUM ('actief', 'onderhoud_nodig', 'storing');
CREATE TYPE gebruiker_rol AS ENUM ('technieker', 'supervisor', 'admin');
CREATE TYPE onderhoud_frequentie AS ENUM ('dagelijks', 'wekelijks', 'maandelijks');
CREATE TYPE onderhoud_status AS ENUM ('gepland', 'voltooid', 'overgeslagen');

-- ============================================================
-- gebruiker
-- ============================================================

CREATE TABLE gebruiker (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    naam             VARCHAR(100)        NOT NULL,
    email            VARCHAR(255)        NOT NULL UNIQUE,
    rol              gebruiker_rol       NOT NULL DEFAULT 'technieker'
);

-- ============================================================
-- filtratie_unit
-- ============================================================
CREATE TABLE filtratie_unit (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    naam          VARCHAR(100)   NOT NULL,
    locatie       VARCHAR(255)   NOT NULL,
    status        unit_status    NOT NULL DEFAULT 'actief',
    aangemaakt_op TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- ============================================================
-- waarden_range
-- alarmgrenzen per unit — 1-op-1 relatie met filtratie_unit
-- ============================================================

CREATE TABLE waarden_range (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id             UUID NOT NULL UNIQUE REFERENCES filtratie_unit(id) ON DELETE CASCADE,

    ph_min              NUMERIC(5,2)  NOT NULL DEFAULT 6.8,
    ph_max              NUMERIC(5,2)  NOT NULL DEFAULT 8.2,

    water_level_min     NUMERIC(6,2)  NOT NULL,
    water_level_max     NUMERIC(6,2)  NOT NULL,

    temperatuur_min     NUMERIC(5,2)  NOT NULL,
    temperatuur_max     NUMERIC(5,2)  NOT NULL,

    zoutgehalte_min     NUMERIC(5,3)  NOT NULL,
    zoutgehalte_max     NUMERIC(5,3)  NOT NULL,

    microbiologie_max   NUMERIC(10,2) NOT NULL,

    CONSTRAINT ph_range_check          CHECK (ph_min < ph_max),
    CONSTRAINT water_level_range_check CHECK (water_level_min < water_level_max),
    CONSTRAINT temperatuur_range_check CHECK (temperatuur_min < temperatuur_max),
    CONSTRAINT zoutgehalte_range_check CHECK (zoutgehalte_min < zoutgehalte_max)
);

-- ============================================================
-- filtratie_waarden
-- logboek van metingen door medewerkers
-- ============================================================

CREATE TABLE filtratie_waarden (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id         UUID NOT NULL REFERENCES filtratie_unit(id) ON DELETE CASCADE,
    medewerker_id   UUID NOT NULL REFERENCES gebruiker(id),

    ph              NUMERIC(5,2),
    water_level     NUMERIC(6,2),
    temperatuur     NUMERIC(5,2),
    zoutgehalte     NUMERIC(5,3),
    microbiologie   NUMERIC(10,2),

    notitie         TEXT,
    foto_url        TEXT,

    gemeten_op      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_filtratie_waarden_unit_id   ON filtratie_waarden(unit_id);
CREATE INDEX idx_filtratie_waarden_gemeten_op ON filtratie_waarden(gemeten_op DESC);

-- ============================================================
-- onderhoud
-- planning en historiek van onderhoudstaken per unit
-- ============================================================

CREATE TABLE onderhoud (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id          UUID NOT NULL REFERENCES filtratie_unit(id) ON DELETE CASCADE,
    toegewezen_aan   UUID REFERENCES gebruiker(id) ON DELETE SET NULL,

    frequentie       onderhoud_frequentie NOT NULL,
    start_datum      DATE                 NOT NULL,
    end_datum   DATE                 NOT NULL,
    status           onderhoud_status     NOT NULL DEFAULT 'gepland',

    notitie          TEXT,
    bijgewerkt_op    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT end_na_start CHECK (end_datum >= start_datum)
);

CREATE INDEX idx_onderhoud_unit_id       ON onderhoud(unit_id);
CREATE INDEX idx_onderhoud_volgende_datum ON onderhoud(volgende_datum ASC);
CREATE INDEX idx_onderhoud_toegewezen    ON onderhoud(toegewezen_aan);

-- ============================================================
-- trigger: bijgewerkt_op automatisch updaten bij wijziging
-- ============================================================

CREATE OR REPLACE FUNCTION update_bijgewerkt_op()
RETURNS TRIGGER AS $$
BEGIN
    NEW.bijgewerkt_op = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_onderhoud_bijgewerkt
    BEFORE UPDATE ON onderhoud
    FOR EACH ROW EXECUTE FUNCTION update_bijgewerkt_op();

-- ============================================================
-- trigger: status filtratie_unit automatisch bijwerken
-- wanneer een meting buiten de alarmgrenzen valt
-- ============================================================

CREATE OR REPLACE FUNCTION check_waarden_alarm()
RETURNS TRIGGER AS $$
DECLARE
    r waarden_range%ROWTYPE;
BEGIN
    SELECT * INTO r FROM waarden_range WHERE unit_id = NEW.unit_id;

    IF NOT FOUND THEN
        RETURN NEW;
    END IF;

    IF (NEW.ph            IS NOT NULL AND (NEW.ph            < r.ph_min            OR NEW.ph            > r.ph_max))
    OR (NEW.water_level   IS NOT NULL AND (NEW.water_level   < r.water_level_min   OR NEW.water_level   > r.water_level_max))
    OR (NEW.temperatuur   IS NOT NULL AND (NEW.temperatuur   < r.temperatuur_min   OR NEW.temperatuur   > r.temperatuur_max))
    OR (NEW.zoutgehalte   IS NOT NULL AND (NEW.zoutgehalte   < r.zoutgehalte_min   OR NEW.zoutgehalte   > r.zoutgehalte_max))
    OR (NEW.microbiologie IS NOT NULL AND  NEW.microbiologie > r.microbiologie_max)
    THEN
        UPDATE filtratie_unit SET status = 'storing' WHERE id = NEW.unit_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_alarm
    AFTER INSERT ON filtratie_waarden
    FOR EACH ROW EXECUTE FUNCTION check_waarden_alarm();

-- ============================================================
-- voorbeeld-data
-- ============================================================

INSERT INTO filtratie_unit (naam, locatie, status) VALUES
    ('Dolfijnenbad A',   'Sector Noord · Hal 3',    'actief'),
    ('Zeeleeuwen B',     'Sector Oost · Buitenbad', 'onderhoud_nodig'),
    ('Orkanenbassin C',  'Sector West · Hal 1',     'storing'),
    ('Robbenwei D',      'Sector Zuid · Buitenbad', 'actief');

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop function if it exists
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.gebruiker (id, naam, rol, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'naam',
    COALESCE((NEW.raw_user_meta_data->>'role')::public.gebruiker_rol, 'technieker'),
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- Create trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();

CREATE OR REPLACE FUNCTION generate_onderhoud_reeks()
RETURNS TRIGGER AS $$
DECLARE
    loop_date DATE;
    end_date DATE;
    interval_step INTERVAL;
BEGIN
    -- Prevent recursion
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;

    CASE NEW.frequentie
        WHEN 'dagelijks' THEN
            interval_step := INTERVAL '1 day';
        WHEN 'wekelijks' THEN
            interval_step := INTERVAL '1 week';
        WHEN 'maandelijks' THEN
            interval_step := INTERVAL '1 month';
        ELSE
            RETURN NEW;
    END CASE;

    loop_date := NEW.start_datum;
    end_date := NEW.end_date;

    LOOP
        loop_date := (loop_date + interval_step)::DATE;

        EXIT WHEN loop_date > end_date;

        INSERT INTO onderhoud (
            unit_id,
            toegewezen_aan,
            frequentie,
            start_datum,
            end_date,
            status,
            notitie
        )
        VALUES (
            NEW.unit_id,
            NEW.toegewezen_aan,
            NEW.frequentie,
            loop_date,
            end_date,
            'gepland',
            NEW.notitie
        );
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER trg_generate_onderhoud_reeks
AFTER INSERT ON onderhoud
FOR EACH ROW
EXECUTE FUNCTION generate_onderhoud_reeks();



-- SELECT: admin & supervisor zien alles, technieker enkel eigen taken
create policy "onderhoud select"
on public.onderhoud
as permissive
for select
to public
using (
  (select rol from public.gebruiker where id = auth.uid()) in ('admin', 'supervisor')
  or toegewezen_aan = auth.uid()
);
 
-- INSERT: enkel admin & supervisor mogen taken aanmaken
create policy "onderhoud insert"
on public.onderhoud
as permissive
for insert
to public
with check (
  (select rol from public.gebruiker where id = auth.uid()) in ('admin', 'supervisor')
);
 
-- UPDATE: admin & supervisor mogen alles, technieker enkel eigen toegewezen taak
create policy "onderhoud update"
on public.onderhoud
as permissive
for update
to public
using (
  (select rol from public.gebruiker where id = auth.uid()) in ('admin', 'supervisor')
  or toegewezen_aan = auth.uid()
);
 
-- DELETE: enkel admin
create policy "onderhoud delete"
on public.onderhoud
as permissive
for delete
to public
using (
  (select rol from public.gebruiker where id = auth.uid()) = 'admin'
);
 
 
 
 
 
 
 
 
///////////////////////////////////////////////////////////////////////////////////
 
 
 
 
 
 
 
 
 
-- SELECT: admin & supervisor zien alles, technieker enkel eigen metingen
create policy "filtratie_waarden select"
on public.filtratie_waarden
as permissive
for select
to public
using (
  (select rol from public.gebruiker where id = auth.uid()) in ('admin', 'supervisor')
  or medewerker_id = auth.uid()
);
 
-- INSERT: ingelogde users mogen metingen toevoegen, maar enkel onder eigen naam
create policy "filtratie_waarden insert"
on public.filtratie_waarden
as permissive
for insert
to public
with check (
  medewerker_id = auth.uid()
);
 
-- UPDATE: admin & supervisor mogen alles, technieker enkel eigen metingen
create policy "filtratie_waarden update"
on public.filtratie_waarden
as permissive
for update
to public
using (
  (select rol from public.gebruiker where id = auth.uid()) in ('admin', 'supervisor')
  or medewerker_id = auth.uid()
);
 
-- DELETE: enkel admin
create policy "filtratie_waarden delete"
on public.filtratie_waarden
as permissive
for delete
to public
using (
  (select rol from public.gebruiker where id = auth.uid()) = 'admin'
);
 
 
 
 
 
 
 
 
 
 
///////////////////////////////////////////////////////////////////////////////////
 
 
 
 
 
 
 
 
-- SELECT: admin, supervisor & technieker mogen ranges bekijken (nodig voor alarm-vergelijking)
create policy "waarden_range select"
on public.waarden_range
as permissive
for select
to public
using (
  (select rol from public.gebruiker where id = auth.uid()) in ('admin', 'supervisor', 'technieker')
);
 
-- INSERT: enkel admin (alarmgrenzen aanpassen is admin-taak)
create policy "waarden_range insert"
on public.waarden_range
as permissive
for insert
to public
with check (
  (select rol from public.gebruiker where id = auth.uid()) = 'admin'
);
 
-- UPDATE: enkel admin
create policy "waarden_range update"
on public.waarden_range
as permissive
for update
to public
using (
  (select rol from public.gebruiker where id = auth.uid()) = 'admin'
);
 
-- DELETE: enkel admin
create policy "waarden_range delete"
on public.waarden_range
as permissive
for delete
to public
using (
  (select rol from public.gebruiker where id = auth.uid()) = 'admin'
);
 
 
 
 
 
 
 
 
///////////////////////////////////////////////////////////////////////////////////
 
 
 
 
 
 
 
 
-- SELECT: iedereen ingelogd mag gebruikers bekijken
create policy "gebruiker select"
on public.gebruiker
as permissive
for select
to public
using (true);
 
-- INSERT: enkel admin mag nieuwe gebruikers aanmaken
create policy "gebruiker insert"
on public.gebruiker
as permissive
for insert
to public
with check (
  (select rol from public.gebruiker where id = auth.uid()) = 'admin'
);
 
-- UPDATE: admin mag iedereen aanpassen, user mag eigen profiel aanpassen
create policy "gebruiker update"
on public.gebruiker
as permissive
for update
to public
using (
  id = auth.uid()
  or (select rol from public.gebruiker where id = auth.uid()) = 'admin'
);
 
-- DELETE: enkel admin
create policy "gebruiker delete"
on public.gebruiker
as permissive
for delete
to public
using (
  (select rol from public.gebruiker where id = auth.uid()) = 'admin'
);
 
 
 
 
 
 
 
///////////////////////////////////////////////////////////////////////////////////
 
 
 
 
 
 
 
 
 
 
ALTER TABLE filtratie_waarden
DROP CONSTRAINT filtratie_waarden_medewerker_id_fkey;
 
ALTER TABLE filtratie_waarden
ADD CONSTRAINT filtratie_waarden_medewerker_id_fkey
  FOREIGN KEY (medewerker_id)
  REFERENCES gebruiker(id)
  ON DELETE CASCADE;
 
 
 
 
 
 
 
 
///////////////////////////////////////////////////////////////////////////////////