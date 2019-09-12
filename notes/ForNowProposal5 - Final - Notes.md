1) App create a new field in current or future season.
  - Create a new field in master field list.
  - Create a new season field in current season with same id as master list.
2) Winfield create a new field in current season.
  - Create a new season field in current season with same id as master list.
2) App deleting a field in current or future season.
  - Remove the season-field in the current or future season.
  - Remove the field from the master list.
2) App edits a field boundary in current year.
  - Edit the current field boundary in master list.
  - Edit the field boundary in the season-field list.
3) Winfield edits a field boundary in current year.
  - Edit the season field boundary for the current and future years.
4) App edits a field boundary in past year.
  - Edit the season field boundary.
5) App changing the farm or grower for a field for the current year.
6) Winfield changing the farm or grower for a field for the current year.
7) App changing the farm or grower for a field for a past year.
8) First new operation is made in a new year.
  - Create season fields matching the master list (or prior season field year if exists? if allow 2yrs in advance)


HERE (maybe?): When a thing is marked as 'planned' started or done, it makes a boundary in the operation.


Without geohash tables:
  1) Getting the operation history of a field.
    - Look through all old operations, look for this field-uuid
  2) Getting all the fields in the view-port.
    - Look for all fields in the current years season-fields list.

WITH geohash tables (could be optimized with boundary hashes probably, lots of copies of data currently):
  1) Getting the operation history of a field.
    - Get the geohashes of the field of interest.
    - Go to the geohash index and get list of all season-field-uuid's
    - Get those season-fields
    - If boundaries match perfectly then no need for polygon clipping.
    - If it is partially inside, then do polygon clipping algo to find if it is inside at all.
    - Get list of operations-uuids
    - Get operations for history
  2) Getting all the fields in the view-port.
    - Get geohashes in viewport
    - Lookup season-field-uuids
