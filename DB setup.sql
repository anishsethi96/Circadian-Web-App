CREATE TABLE User_Info (
  UID varchar (255),
  Password varchar(255) NOT NULL,
  First_Name varchar (255) NOT NULL,
  Last_Name varchar (255) NOT NULL,
  Email_ID varchar (255),
  Company_Name varchar (255),
  PRIMARY KEY (UID)
);

CREATE TABLE Rooms (
  Room_Type_ID varchar(255), -- contains a unique description of the rooms
  Standard_Name varchar (255),
  Application_Type varchar (255),
  LUX_Level_Min decimal,
  LUX_Level_Nom decimal,
  LUX_Level_Max decimal,
  PRIMARY KEY (Room_Type_ID)
);

CREATE TABLE SPD_Data (
  SPD_ID serial,
  User_UID varchar (255),
  SPD_Name varchar (255) NOT NULL,
  SPD_Value JSON NOT NULL,
  Lux_Level decimal, -- (if the SPD is normalized then the lux value is NULL.)
  PRIMARY KEY (SPD_ID),
  FOREIGN KEY (User_UID) REFERENCES User_Info (UID)
);

CREATE TABLE Saved_Room (
	Room_UID varchar (255),
	Building_Name varchar (255),
  Room_Name varchar (255), -- (User defined string value, used to identify previously created rooms.)
	Location varchar (255),
  SavedRoom_Type varchar (255),
	Measurement_Angle decimal,
  Measurement_Height decimal, --when you change angle and height, SPD values also change hence the SPD_ID will change
	Room_SPD_ID int,
  PRIMARY KEY (Building_Name, Room_Name, Location, Room_SPD_ID),
  FOREIGN KEY (Room_SPD_ID) REFERENCES SPD_Data (SPD_ID),
  FOREIGN KEY (SavedRoom_Type) REFERENCES Rooms (Room_Type_ID)
);
