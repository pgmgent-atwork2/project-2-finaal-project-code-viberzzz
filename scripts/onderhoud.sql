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