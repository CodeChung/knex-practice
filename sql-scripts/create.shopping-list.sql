alter table shopping_list drop category;

drop type if exists grocery;
create type grocery as enum(
    'Main',
    'Snack',
    'Lunch',
    'Breakfast'
);

drop table if exists shopping_list;

CREATE TABLE shopping_list (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    price decimal(12,2) NOT NULL,
    date_added timestamp default now() not null,
    checked boolean not null,
    category grocery NOT NULL
);
