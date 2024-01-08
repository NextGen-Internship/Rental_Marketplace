CREATE table if not exists user_role(
id int auto_increment primary key ,
role_description varchar(255) not null
);
CREATE table if not exists address(
id int auto_increment primary key ,
city varchar(100) not null,
street varchar(100)not null,
post_code varchar(10)not null,
street_number varchar(10)not null
);
CREATE table if not exists user(
id int auto_increment primary key ,
first_name varchar(50)not null,
last_name varchar(50) not null,
password varchar(255) not null ,
email varchar(100) unique not null ,
address_id int ,
 FOREIGN KEY (address_id) REFERENCES address(id),
profile_picture varchar(512),
role_id int ,
FOREIGN KEY (role_id) references user_role(id),
phone varchar(10)not null unique
);
CREATE table if not exists item_category(
id int auto_increment primary key ,
name varchar(100) not null,
description varchar(255) not null
);
CREATE table if not exists item(
id int auto_increment primary key ,
name varchar(100)not null,
description varchar(255)not null,
price decimal(5,2)not null,
category_id int ,
foreign key (category_id) references item_category(id),
user_id int ,
foreign key (user_id) references user(id),
posted_date datetime not null,
deposit float(5,2) not null,
address_id int,
foreign key (address_id) references address(id)
);
CREATE table if not exists picture(
id int auto_increment primary key ,
url varchar(512)not null,
item_id int ,
foreign key (item_id) references item(id)
);
CREATE table if not exists liked_item(
id int auto_increment primary key ,
item_id int ,
foreign key (item_id) references item(id),
user_id int ,
foreign key (user_id) references user(id)
);
CREATE table if not exists rent(
id int auto_increment primary key ,
item_id int ,
foreign key (item_id) references item(id),
user_id int ,
foreign key (user_id) references user(id),
start_date datetime not null,
end_date datetime not null
);
CREATE table if not exists payment(
id int auto_increment primary key ,
amount decimal(5,2) not null ,
status varchar(50) not null,
date datetime not null,
owner_id int ,
foreign key (owner_id) references user(id),
receiver_id int ,
foreign key (receiver_id) references user(id),
method varchar(50) not null,
rent_id int ,
foreign key (rent_id) references rent(id)
);
CREATE table if not exists review(
id int auto_increment primary key ,
rating smallint,
comment varchar(255),
item_id int ,
foreign key (item_id) references item(id),
user_id int ,
foreign key (user_id) references user(id)
);
CREATE table if not exists history(
id int auto_increment primary key ,
user_id int ,
foreign key (user_id) references user(id),
item_id int ,
foreign key (item_id) references item(id),
date datetime
);