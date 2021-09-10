/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: artists
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `artists` (
  `fullname` varchar(64) NOT NULL,
  PRIMARY KEY (`fullname`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: artists_songs
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `artists_songs` (
  `SID` varchar(64) NOT NULL,
  `artist_name` varchar(64) NOT NULL,
  KEY `SID` (`SID`),
  KEY `artist_name` (`artist_name`),
  CONSTRAINT `artists_songs_ibfk_1` FOREIGN KEY (`SID`) REFERENCES `songs` (`SID`),
  CONSTRAINT `artists_songs_ibfk_2` FOREIGN KEY (`artist_name`) REFERENCES `artists` (`fullname`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: groups_of_words
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `groups_of_words` (
  `group_name` varchar(64) NOT NULL,
  PRIMARY KEY (`group_name`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: groups_words
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `groups_words` (
  `group_name` varchar(64) NOT NULL,
  `WordID` varchar(64) NOT NULL,
  KEY `group_name` (`group_name`),
  KEY `WordID` (`WordID`),
  CONSTRAINT `groups_words_ibfk_1` FOREIGN KEY (`group_name`) REFERENCES `groups_of_words` (`group_name`),
  CONSTRAINT `groups_words_ibfk_2` FOREIGN KEY (`WordID`) REFERENCES `words` (`WID`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: phrases
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `phrases` (
  `phrase` varchar(512) NOT NULL,
  PRIMARY KEY (`phrase`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: songs
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `songs` (
  `SID` varchar(64) NOT NULL,
  `song_name` varchar(64) NOT NULL,
  `song_year` int(11) NOT NULL,
  `genre_name` varchar(64) NOT NULL,
  PRIMARY KEY (`SID`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: words
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `words` (
  `WID` varchar(64) NOT NULL,
  `text_data` varchar(128) NOT NULL,
  `SID` varchar(64) NOT NULL,
  `section` int(11) NOT NULL,
  `section_row` int(11) NOT NULL,
  `row_offset` int(11) NOT NULL,
  PRIMARY KEY (`WID`),
  KEY `SID` (`SID`),
  CONSTRAINT `words_ibfk_1` FOREIGN KEY (`SID`) REFERENCES `songs` (`SID`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: writers
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `writers` (
  `fullname` varchar(32) NOT NULL,
  PRIMARY KEY (`fullname`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: writers_songs
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `writers_songs` (
  `SID` varchar(64) NOT NULL,
  `writer_name` varchar(64) NOT NULL,
  KEY `SID` (`SID`),
  KEY `writer_name` (`writer_name`),
  CONSTRAINT `writers_songs_ibfk_1` FOREIGN KEY (`SID`) REFERENCES `songs` (`SID`),
  CONSTRAINT `writers_songs_ibfk_2` FOREIGN KEY (`writer_name`) REFERENCES `writers` (`fullname`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: artists
# ------------------------------------------------------------

INSERT INTO
  `artists` (`fullname`)
VALUES
  ('guy fattal');
INSERT INTO
  `artists` (`fullname`)
VALUES
  ('nadav friedman');
INSERT INTO
  `artists` (`fullname`)
VALUES
  ('omer adam');
INSERT INTO
  `artists` (`fullname`)
VALUES
  ('shakira');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: artists_songs
# ------------------------------------------------------------

INSERT INTO
  `artists_songs` (`SID`, `artist_name`)
VALUES
  (
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    'nadav friedman'
  );
INSERT INTO
  `artists_songs` (`SID`, `artist_name`)
VALUES
  (
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    'omer adam'
  );
INSERT INTO
  `artists_songs` (`SID`, `artist_name`)
VALUES
  (
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    'nadav friedman'
  );
INSERT INTO
  `artists_songs` (`SID`, `artist_name`)
VALUES
  (
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    'guy fattal'
  );
INSERT INTO
  `artists_songs` (`SID`, `artist_name`)
VALUES
  (
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    'nadav friedman'
  );
INSERT INTO
  `artists_songs` (`SID`, `artist_name`)
VALUES
  ('1746b4e9-b9db-41b0-8ad7-dc71e1196d71', 'shakira');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: groups_of_words
# ------------------------------------------------------------

INSERT INTO
  `groups_of_words` (`group_name`)
VALUES
  ('sports');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: groups_words
# ------------------------------------------------------------

INSERT INTO
  `groups_words` (`group_name`, `WordID`)
VALUES
  ('sports', '07fd7db7-d575-432b-b8d2-530f9c20758a');
INSERT INTO
  `groups_words` (`group_name`, `WordID`)
VALUES
  ('sports', '3093ee1b-8052-425c-92fc-46b16f26ef4b');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: phrases
# ------------------------------------------------------------

INSERT INTO
  `phrases` (`phrase`)
VALUES
  ('how are you');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: songs
# ------------------------------------------------------------

INSERT INTO
  `songs` (`SID`, `song_name`, `song_year`, `genre_name`)
VALUES
  (
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    'fattal song',
    2019,
    'pop'
  );
INSERT INTO
  `songs` (`SID`, `song_name`, `song_year`, `genre_name`)
VALUES
  (
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    'fredi song',
    2021,
    'pop'
  );
INSERT INTO
  `songs` (`SID`, `song_name`, `song_year`, `genre_name`)
VALUES
  (
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    'file uploaded song',
    2021,
    'mygenre'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: words
# ------------------------------------------------------------

INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '07fd7db7-d575-432b-b8d2-530f9c20758a',
    'fine',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    0,
    2,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '0e5aea47-d65d-482b-ad04-ece08a9fd254',
    'are',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    1,
    0,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '0f7392a8-358a-41b3-95ab-0104475e704d',
    'day',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    1,
    1,
    3
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '1401c01f-3010-4bb5-aa4e-cca0d818d9a9',
    'thank',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    0,
    2,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '1f51b534-3008-4c07-8a95-eeab57b8b032',
    'hello',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    0,
    0,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '21e09d42-4ae2-4aa2-ae9d-1199355a0c9e',
    'are',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    1,
    0,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '2520a937-b915-466f-a525-7f9589822bb7',
    'me',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    0,
    0,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '2bfb9dd7-e5c2-4b4c-8904-73b5360da656',
    'you',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    0,
    2,
    3
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '3093ee1b-8052-425c-92fc-46b16f26ef4b',
    'how',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    0,
    1,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '36347aca-e288-4baf-95f1-55d2317b6023',
    'you',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    0,
    1,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '3b1ca347-aef6-464e-9a32-2c49d4ee4207',
    'a',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    1,
    1,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '3dbe4256-ba33-4321-8d00-df327be77c1e',
    'goodbye',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    1,
    2,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '406f9bc1-fdf4-454d-b433-0ae73b1c156b',
    'you',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    0,
    2,
    3
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '429e55af-1492-4b31-9338-ae45c7e681a0',
    'im',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    0,
    2,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '4f753a55-7c60-4236-b980-bbfdcda21b89',
    'me',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    0,
    0,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '4f98737b-2a6c-4b22-ae01-4d69d20e196c',
    'darling',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    1,
    2,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '56abdaa2-ca55-46c4-8c39-cee3a78a0a86',
    'darling',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    1,
    2,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '619233ae-af97-46c1-aea0-29af9fb71fbf',
    'have',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    1,
    1,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '623dc4b0-e6a1-499f-a152-33fb34113578',
    'darling',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    1,
    2,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '63cdb739-47eb-4880-8814-8a6fa16d1f32',
    'im',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    0,
    2,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '64d1cdf8-d871-4e27-843d-cfc839b632ca',
    'hello',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    0,
    0,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '66077582-29f0-48c3-ae78-d2e06251fcb7',
    'its',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    0,
    0,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '68ff34ca-779c-43fb-ae95-0814bd73e5fb',
    'how',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    0,
    1,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '693534ee-cb9d-4cff-aaeb-cf3bd4794731',
    'welcom',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    1,
    0,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '6ad6b90c-04da-4a57-a3e1-9ba484df94bc',
    'goodbye',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    1,
    2,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '6b37c592-5a30-48e3-95f8-0988dd4962de',
    'are',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    0,
    1,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '6fb4aec1-5517-4e38-a1a0-770cb3f64e2b',
    'you',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    0,
    1,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '71845556-a45e-490a-972e-da844a3023f6',
    'hello',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    0,
    0,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '7a52d93a-3fe4-4e25-8249-fe5aa98ab523',
    'how',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    0,
    1,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '7e2528fc-c007-4fda-b991-60252a4e27d7',
    'a',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    1,
    1,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '84575104-a517-4b4d-8af3-0c7f360873d0',
    'day',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    1,
    1,
    3
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '8a764c70-08e6-4d4c-956a-4b36d036b37e',
    'fine',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    0,
    2,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    '9fd07d3e-3708-4118-b463-d00223a4a2f3',
    'welcom',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    1,
    0,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'a62be6d5-a651-483c-810b-4e3f7c97b3c7',
    'its',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    0,
    0,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'a69c2fe4-fd7e-432c-8da2-851bf7ae965a',
    'goodbye',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    1,
    2,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'ac4a0b8d-3ff7-4f25-8883-bf6ce9bd7de8',
    'me',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    0,
    0,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'b03b3402-a143-415f-98ea-4804eec53a5a',
    'have',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    1,
    1,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'b4148508-4593-41af-8d30-efa71702c234',
    'are',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    1,
    0,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'b81c1709-593c-4ba3-8a17-38c84af91a28',
    'welcome',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    1,
    0,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'b8a0e4d5-d9e3-4b5b-b9c2-026b916a1f50',
    'you',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    1,
    0,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'bc5dc8b4-3e32-488c-a860-fed69a43b250',
    'are',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    0,
    1,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'bd9fdfce-386d-442e-9252-f86c2b1d4d09',
    'day',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    1,
    1,
    3
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'bdc34314-bb93-4720-9a14-1691d6e4438b',
    'its',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    0,
    0,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'beb12d7e-5cde-4b55-9e7f-e70979ecdd5d',
    'thank',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    0,
    2,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'c9a9fbd5-b4b1-45c7-aecb-bf1e9bedcb13',
    'nice',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    1,
    1,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'cbf2ef68-c83e-4a25-91d8-76dd518dbf70',
    'are',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    0,
    1,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'cfde1e0a-a27a-4c8b-80a1-c2ca1c30e10d',
    'nice',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    1,
    1,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'd1bc07b9-43b3-4bfb-84d9-24899b91aa58',
    'a',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    1,
    1,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'df376784-89dd-4625-b7f6-d0d2085d7580',
    'fine',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    0,
    2,
    1
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'dff5bbee-8baa-4169-9233-25bdbb317c76',
    'you',
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    0,
    2,
    3
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'e203782e-f7e6-410b-b677-50f306090ca1',
    'im',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    0,
    2,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'e9ba16da-cd07-4563-9e25-91459f7b3e9b',
    'you',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    0,
    1,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'f0f0316f-0b87-45e2-93d0-b27c1404fdf7',
    'you',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    1,
    0,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'f3be4d73-ad08-42ee-b73c-7514457a460b',
    'nice',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    1,
    1,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'f623f5c4-0773-4655-b36b-d462ed552bb3',
    'thank',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    0,
    2,
    2
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'f90fd3a4-0a23-476a-ae66-53b7690dc098',
    'have',
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    1,
    1,
    0
  );
INSERT INTO
  `words` (
    `WID`,
    `text_data`,
    `SID`,
    `section`,
    `section_row`,
    `row_offset`
  )
VALUES
  (
    'ffb11f5f-8e70-43d8-883e-668fdcbf7795',
    'you',
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    1,
    0,
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: writers
# ------------------------------------------------------------

INSERT INTO
  `writers` (`fullname`)
VALUES
  ('guy fattal');
INSERT INTO
  `writers` (`fullname`)
VALUES
  ('shakira');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: writers_songs
# ------------------------------------------------------------

INSERT INTO
  `writers_songs` (`SID`, `writer_name`)
VALUES
  ('6650fb82-3fc7-4b57-ba5c-0efeec94cf13', 'shakira');
INSERT INTO
  `writers_songs` (`SID`, `writer_name`)
VALUES
  (
    '6650fb82-3fc7-4b57-ba5c-0efeec94cf13',
    'guy fattal'
  );
INSERT INTO
  `writers_songs` (`SID`, `writer_name`)
VALUES
  ('5605b4bd-2222-4978-a681-5198de7bfcd1', 'shakira');
INSERT INTO
  `writers_songs` (`SID`, `writer_name`)
VALUES
  (
    '5605b4bd-2222-4978-a681-5198de7bfcd1',
    'guy fattal'
  );
INSERT INTO
  `writers_songs` (`SID`, `writer_name`)
VALUES
  ('1746b4e9-b9db-41b0-8ad7-dc71e1196d71', 'shakira');
INSERT INTO
  `writers_songs` (`SID`, `writer_name`)
VALUES
  (
    '1746b4e9-b9db-41b0-8ad7-dc71e1196d71',
    'guy fattal'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
