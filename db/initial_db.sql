create type carts_statuses as enum('OPEN', 'ORDERED');
create type order_statuses as enum('IN_PROGRESS', 'CLOSED');

create table carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	created_at timestamp not null default current_timestamp,
	updated_at timestamp not null default current_timestamp,
	status carts_statuses
)

create table cart_items (
	item_id uuid not null default uuid_generate_v4() primary key,
	cart_id uuid references carts(id),
	product_id uuid,
	count integer not null
)

create table orders (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	cart_id uuid not null references carts(id),
	payment json not null,
	delivery json not null,
	comments text,
	status order_statuses not null,
	total integer not null,
	created_at timestamp not null default current_timestamp,
	updated_at timestamp not null default current_timestamp	
)
