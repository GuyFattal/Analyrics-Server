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
# SCHEMA DUMP FOR TABLE: genres
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `genres` (
  `genre_name` varchar(64) NOT NULL,
  PRIMARY KEY (`genre_name`)
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
  PRIMARY KEY (`SID`),
  KEY `genre_name` (`genre_name`),
  CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`genre_name`) REFERENCES `genres` (`genre_name`)
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
  ('shakira');
INSERT INTO
  `artists` (`fullname`)
VALUES
  ('shimi tavori');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: artists_songs
# ------------------------------------------------------------

INSERT INTO
  `artists_songs` (`SID`, `artist_name`)
VALUES
  (
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
    'shimi tavori'
  );
INSERT INTO
  `artists_songs` (`SID`, `artist_name`)
VALUES
  (
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
    'guy fattal'
  );
INSERT INTO
  `artists_songs` (`SID`, `artist_name`)
VALUES
  (
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
    'nadav friedman'
  );
INSERT INTO
  `artists_songs` (`SID`, `artist_name`)
VALUES
  (
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
    'guy fattal'
  );
INSERT INTO
  `artists_songs` (`SID`, `artist_name`)
VALUES
  (
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
    'nadav friedman'
  );
INSERT INTO
  `artists_songs` (`SID`, `artist_name`)
VALUES
  ('14a3ccd8-c0cc-40d4-8b1a-f221e452aa35', 'shakira');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: genres
# ------------------------------------------------------------

INSERT INTO
  `genres` (`genre_name`)
VALUES
  ('electro');
INSERT INTO
  `genres` (`genre_name`)
VALUES
  ('pop');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: groups_of_words
# ------------------------------------------------------------

INSERT INTO
  `groups_of_words` (`group_name`)
VALUES
  ('nature');
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
  ('nature', '03ecada6-3e2e-44cf-b950-59d6f37aca84');
INSERT INTO
  `groups_words` (`group_name`, `WordID`)
VALUES
  ('sports', '2314762c-8eb9-4e2f-8a10-65741db6b645');
INSERT INTO
  `groups_words` (`group_name`, `WordID`)
VALUES
  ('sports', '03ecada6-3e2e-44cf-b950-59d6f37aca84');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: phrases
# ------------------------------------------------------------

INSERT INTO
  `phrases` (`phrase`)
VALUES
  ('Breathing in the snowflakes');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: songs
# ------------------------------------------------------------

INSERT INTO
  `songs` (`SID`, `song_name`, `song_year`, `genre_name`)
VALUES
  (
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
    'great song',
    2020,
    'pop'
  );
INSERT INTO
  `songs` (`SID`, `song_name`, `song_year`, `genre_name`)
VALUES
  (
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
    'fredi song',
    2017,
    'electro'
  );
INSERT INTO
  `songs` (`SID`, `song_name`, `song_year`, `genre_name`)
VALUES
  (
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
    'fattal song',
    2020,
    'pop'
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
    '03ecada6-3e2e-44cf-b950-59d6f37aca84',
    'snowflakes',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
    0,
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
    '0c417859-dcdb-46bc-bd9e-83ac36e1e15a',
    'they',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    '0d1165b6-64d1-4b15-b75a-e97e24875df4',
    'stuck',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    '117dc375-abdf-4fb5-81ee-39ee4f24c734',
    'team',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
    1,
    1,
    5
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
    '11ba0bca-8430-4ca6-9f35-f3f52387442f',
    'face',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
    0,
    0,
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
    '13b0505e-3c48-410b-adb6-2c3beed3f32f',
    'burnt',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    '18182b07-8c0b-4d8d-8854-2d3b5f38879c',
    'in',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    '1ab94de5-b02a-4cf1-a612-0acbec01109f',
    'in',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    '217f2ee4-a3e5-4b9f-a0f8-dd19d1e1f4b0',
    'say',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    '21cbd69c-e6af-4057-884a-4be73dde53ac',
    'say',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    '21f14eda-7ce0-459b-bdc7-cc85c007fac9',
    'her',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
    1,
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
    '22a1ddd3-f039-455a-ab1a-aebdecda4231',
    'in',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    '22bb9100-7c41-43db-9ade-18b4b68f9f15',
    'the',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    '2314762c-8eb9-4e2f-8a10-65741db6b645',
    'her',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
    1,
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
    '27763558-619c-4aa3-bb71-761658691ca4',
    'class',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    '30e99393-1373-4cdd-9ac5-5f2f33e64f51',
    'breathing',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    '33d1b823-497c-47f7-bc66-ba7c4117f5d9',
    'in',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    '359476d9-e153-463e-aad9-d5ba795af74b',
    'pale',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    '3677aaee-02d1-4234-b49b-7ab9b177056c',
    'a',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
    1,
    1,
    4
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
    '4261fa47-c74d-4b97-82ca-16ce856fc72c',
    'the',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    '44e0165a-c05e-4952-b1f1-bff8da35d25f',
    'lips',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    '4512a8e1-b641-460a-acb8-c5cbc67868a6',
    'a',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
    1,
    1,
    4
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
    '49dc881d-ff59-4404-adf1-dc5caafc1139',
    'they',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    '4ab65815-95eb-47a3-b862-bd83f84d01e8',
    'the',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    '4eea04f8-1ffd-4eba-ae2d-1ea2a0bb1ef0',
    'pale',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    '4f8eecac-f8ce-4e24-88ad-cef2b6c36fc3',
    'lungs',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    '529fac29-69a1-458f-97c9-10e32989451f',
    'and',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    '55e2fe7e-ffb9-486b-ba74-88d42906db05',
    'the',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    '5a7132ac-9cac-44fb-a7be-95d74d1afd56',
    'class',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    '5c0afb18-fe19-436f-9987-43c5ebde378a',
    'white',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    '5e6ee05c-db00-423b-b3de-10804b0bf06d',
    'stuck',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    '5f20ccbd-627b-4761-8660-19aa10e460e4',
    'snowflakes',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
    0,
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
    '61988cd8-313e-4d22-b10d-c12bcd489f29',
    'daydream',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
    1,
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
    '64b508b8-397a-40e9-979d-1140c2f25f8b',
    'team',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
    1,
    1,
    5
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
    '6e56618d-3e16-4565-9c2a-a4ed8d03f0d8',
    'taste',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    '70b86cb9-176b-4919-9699-0f8ba022cfaa',
    'burnt',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    '739b79db-4550-4368-b0b5-4169f1754291',
    'in',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    '7489afb9-14b8-46f1-b458-75cce88cf059',
    'a',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
    1,
    1,
    4
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
    '76612bae-fd29-4c65-a871-61d3b3a30438',
    'white',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    '793aec88-1e4c-40a6-998d-14d4fccb8936',
    'she\'s',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    '7ed85225-6598-4511-98c2-c7808fbc618d',
    'sour',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    '83a5d2db-173b-4bf5-9e32-8282d66d4248',
    'face',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
    0,
    0,
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
    '89dc531b-8e19-459b-8556-5cf3c5a09de0',
    'and',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    '8d81f6fb-5c11-4d53-ba77-898941da6b2b',
    'in',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    '91945689-64ec-44e9-9cdf-b9543ccd8f06',
    'she\'s',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    '91d51e72-7740-4c3d-9f9d-d39a944213d4',
    'lips',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    '941eef26-f082-41c8-ae64-a2f15ec541b3',
    'breathing',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    '95061321-328d-4aab-b25e-017bd982879b',
    'burnt',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    '95f6f2e2-4355-4a03-afd4-16804de5422c',
    'pale',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    '96fa34d8-3427-4711-bcf9-b1e647b2f44d',
    'she\'s',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    'a6df9f7e-dd42-4784-8fcb-9c78eaff1925',
    'in',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    'a73d379f-b88a-455e-b24a-cd340e1acfe9',
    'taste',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    'ac53d929-f0f9-40dc-a40d-ca82aab12dbe',
    'the',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    'b03d3896-e8b0-44a5-a001-b904e39f36ee',
    'face',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
    0,
    0,
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
    'b230eb3f-4520-47f2-9d0f-4d02fa1acb8f',
    'lungs',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    'b2593666-3f76-428a-ad7f-9953ae5fe79a',
    'snowflakes',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
    0,
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
    'b4161014-9eeb-4a69-9838-2a0af12c7b7d',
    'in',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    'b501d04a-675e-4983-89d3-ac7f4d7ba4fb',
    'white',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    'b5a9d621-34a1-4ee5-91c2-260543ed8ea4',
    'lungs',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    'b9733485-57b7-45d8-b0fe-43a25cab4bad',
    'the',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    'bbff6bdf-8f9c-4288-8a6d-6bcea9ea6efb',
    'sour',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    'bdfd623c-6c8d-42f4-9ab6-4cb6ce2eefd3',
    'class',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    'bfa118b1-a9d1-4952-8770-99a6f14356b8',
    'daydream',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
    1,
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
    'c5dc710a-5d22-4146-82d6-6248b0e48f99',
    'team',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
    1,
    1,
    5
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
    'd73efce7-a366-4128-8b16-9bb3721aa36b',
    'taste',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    'dac15461-c14c-476b-8a6e-5c621d16aa19',
    'in',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    'db346e80-1784-4bc2-8353-3caaed2f35e8',
    'lips',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    'db57c9a4-cfca-4649-bfc1-858275b2f1da',
    'stuck',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
    'e2bb2ebe-c183-49cf-a2f4-867886bffe6f',
    'her',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
    1,
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
    'e7ec45b2-c270-49ae-956a-05807a5a787e',
    'say',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    'ec4c507d-0c80-4542-9ef3-66d9faf11fed',
    'they',
    '14a3ccd8-c0cc-40d4-8b1a-f221e452aa35',
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
    'f315b147-ae08-44cb-9812-b79d3a1bfc3b',
    'breathing',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    'f3dbfa03-f293-4a0f-b0f3-6dcbe0acdf68',
    'sour',
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
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
    'f486e3a8-a8cd-476a-b9ff-8900e8fdcafb',
    'daydream',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
    1,
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
    'f845ede3-64fc-4282-81cd-66e99113d145',
    'and',
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
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
  ('adele');
INSERT INTO
  `writers` (`fullname`)
VALUES
  ('Dvir landsberg');
INSERT INTO
  `writers` (`fullname`)
VALUES
  ('Nadav Friessdman');
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
  (
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
    'Dvir landsberg'
  );
INSERT INTO
  `writers_songs` (`SID`, `writer_name`)
VALUES
  (
    'b23cc8fa-38cf-44b1-9239-42f055d1b573',
    'Nadav Friessdman'
  );
INSERT INTO
  `writers_songs` (`SID`, `writer_name`)
VALUES
  (
    'c2007402-74f5-4b16-aa5d-eaf952e4c889',
    'Dvir landsberg'
  );
INSERT INTO
  `writers_songs` (`SID`, `writer_name`)
VALUES
  ('c2007402-74f5-4b16-aa5d-eaf952e4c889', 'adele');
INSERT INTO
  `writers_songs` (`SID`, `writer_name`)
VALUES
  ('14a3ccd8-c0cc-40d4-8b1a-f221e452aa35', 'shakira');
INSERT INTO
  `writers_songs` (`SID`, `writer_name`)
VALUES
  ('14a3ccd8-c0cc-40d4-8b1a-f221e452aa35', 'adele');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
