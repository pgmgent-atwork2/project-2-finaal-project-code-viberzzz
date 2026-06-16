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