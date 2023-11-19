CREATE TABLE "x_world" (
  FieldID	int PRIMARY KEY,
  X	smallint,
  Y	smallint,
  Tribe	tinyint,
  VillageID	int,
  Villagename	nvarchar(50),
  PlayerID	int,
  Playername nvarchar(50),
  AllianceID	int,
  AllianceTag	nvarchar(20),
  Population smallint,
  Region	nvarchar(50),
  Capital	boolean,
  City	boolean,
  Harbor	boolean,
  Victory points int
)