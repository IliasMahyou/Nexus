CREATE DATABASE IF NOT EXISTS `NexusDb`;
USE `NexusDb`;
CREATE TABLE IF NOT EXISTS `Gebruikers` (
	`Gebruikersnaam` VARCHAR(30) NOT NULL PRIMARY KEY,
    `Wachtwoord` VARCHAR(64) NOT NULL
);
CREATE TABLE IF NOT EXISTS `Ondernemingen` (
    `Ondernemingsnummer` CHAR(10) NOT NULL PRIMARY KEY,
    `Naam` VARCHAR(100) NOT NULL,
    `Postcode` CHAR(4) NOT NULL,
    `Stad` VARCHAR(80) NOT NULL,
    `Straat` VARCHAR(80) NOT NULL,
    `Nummer` VARCHAR(3) NOT NULL,
    `Datum` DATE NOT NULL,
    `Winst` INT NOT NULL,
    `Schulden` INT NOT NULL,
    `Eigen vermogen` INT NOT NULL
);
CREATE TABLE IF NOT EXISTS `Historiek` (
    `Gebruiker` VARCHAR(30) NOT NULL,
    `Onderneming` CHAR(10) NOT NULL,
	CONSTRAINT `fk_Historiek_Gebruikers`
		FOREIGN KEY (`Gebruiker`)
			REFERENCES `Gebruikers`(`Gebruikersnaam`),
	CONSTRAINT `fk_Historiek_Ondernemingen`
		FOREIGN KEY (`Onderneming`)
			REFERENCES `Ondernemingen`(`Ondernemingsnummer`)
);