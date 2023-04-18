BEGIN;

--Vytvo�en� tabulky U�ivatele
-- Podm�nky: ��dn� atribut nesm� b�t NULL
-- atribut 'email' mus� obsahovat znak '@' 
CREATE TABLE Users (
  Id INT PRIMARY KEY IDENTITY(1,1),
  fname VARCHAR(50) NOT NULL,
  lname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL CHECK (email LIKE '%@%'),
  phone_number VARCHAR(50) NOT NULL,
  password VARCHAR(20) CHECK(password LIKE '%[a-z]%'
      AND password LIKE '%[A-Z]%'
      AND password LIKE '%[0-9]%'
      AND password LIKE '%[^a-zA-Z0-9]%'
      AND LEN(password) >= 8)
);


--Vytvo�en� tabulky Category
-- Podm�nky: ��dn� atribut nesm� b�t NULL
--  atribut 'category_color' mus� obsahovat znak '#' 
CREATE TABLE Category (
    Id INT  PRIMARY KEY IDENTITY(1,1),
    category_name VARCHAR(100) NOT NULL,
    category_color VARCHAR(50) NOT NULL CHECK (category_color LIKE '#%')
);


--Vytvo�en� tabulky TodoItem
-- Podm�nky:  ��dn� atribut nesm� b�t NULL

CREATE TABLE TodoItem (
    Id INT PRIMARY KEY IDENTITY(1,1),
    fk_user_id INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    fk_category_id INT NOT NULL FOREIGN KEY REFERENCES Category(Id),
    item_name VARCHAR(100) NOT NULL,
    [description] VARCHAR(200) ,
    todo_date DATE NOT NULL
);


--Vytvo�en� tabulky Event
-- Podm�nky:  ��dn� atribut nesm� b�t NULL
CREATE TABLE Event (
    Id int IDENTITY(1,1) NOT NULL,
    event_name VARCHAR(150) NOT NULL,
    event_date DATETIME NOT NULL,
    fk_event_user INT FOREIGN KEY REFERENCES Users(Id),
    fk_event_category INT FOREIGN KEY REFERENCES Category(Id)
);





END;