SET GLOBAL host_cache_size=0;
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
DROP DATABASE IF EXISTS ganaderia;
CREATE DATABASE IF NOT EXISTS ganaderia;
USE ganaderia;

# FOR MODEL COMPANY > NO DEPENDENCIES.
CREATE TABLE IF NOT EXISTS `company` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL DEFAULT 'Test Company.' UNIQUE, `description` VARCHAR(255) NOT NULL DEFAULT 'Test Company Description', `address` VARCHAR(255) NOT NULL DEFAULT 'Test Company address' UNIQUE, `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
#COMPANY NO INDEX

# FOR MODEL BREED > DEPENDS ON COMPANY.
CREATE TABLE IF NOT EXISTS `breed` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `name` VARCHAR(255) NOT NULL DEFAULT 'Test Breed.', `description` VARCHAR(255) NOT NULL DEFAULT 'Test Breed Description', `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `breed` ADD UNIQUE INDEX `breed_id_company_name_deleted` (`id_company`, `name`, `deleted`);

# FOR MODEL CATEGORY > DEPENDS ON COMPANY.
CREATE TABLE IF NOT EXISTS `category` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `name` VARCHAR(255) NOT NULL DEFAULT 'Test category.', `description` VARCHAR(255) NOT NULL DEFAULT 'Test category Description', `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `category` ADD UNIQUE INDEX `category_id_company_name_deleted` (`id_company`, `name`, `deleted`);

# FOR MODEL OPERATION > DEPENDS ON COMPANY.
CREATE TABLE IF NOT EXISTS `operation` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `name` VARCHAR(255) NOT NULL DEFAULT 'Test operation.', `description` VARCHAR(255) NOT NULL DEFAULT 'Test operation Description', `period_length` VARCHAR(255) NOT NULL DEFAULT 'Test 2 weeks period.', `repeat` TINYINT(1) NOT NULL DEFAULT false, `period_start` DATETIME NOT NULL DEFAULT now(), `period_end` DATETIME NOT NULL DEFAULT now(), `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `operation` ADD UNIQUE INDEX `operationUniqueIndex` (`id_company`, `name`, `repeat`, `period_length`);

# FOR MODEL SUPPLIER > DEPENDS ON COMPANY.
CREATE TABLE IF NOT EXISTS `supplier` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `name` VARCHAR(255) NOT NULL DEFAULT 'Test Supplier.', `description` VARCHAR(255) NOT NULL DEFAULT 'Test Supplier Description', `email` VARCHAR(255) NOT NULL DEFAULT 'Test@Supplier email' UNIQUE, `phone` INTEGER NOT NULL DEFAULT 0, `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `supplier` ADD UNIQUE INDEX `supplier_id_company_name` (`id_company`, `name`);

# FOR MODEL TROOP > DEPENDS ON COMPANY.
CREATE TABLE IF NOT EXISTS `troop` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `name` VARCHAR(255) NOT NULL DEFAULT 'Test Troop.' UNIQUE, `description` VARCHAR(255) NOT NULL DEFAULT 'Test Troop Description', `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `troop` ADD UNIQUE INDEX `troop_id_company_name_deleted` (`id_company`, `name`, `deleted`);

# FOR MODEL GRASSLAND > DEPENDS ON COMPANY, BREED.
CREATE TABLE IF NOT EXISTS `grassland` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `name` VARCHAR(255) NOT NULL DEFAULT 'Test Grassland.', `description` VARCHAR(255) NOT NULL DEFAULT 'Test Grassland description.', `id_prefered_breed` INTEGER DEFAULT 1, `grass_type` VARCHAR(255) NOT NULL DEFAULT 'Test green grass.', `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_prefered_breed`) REFERENCES `breed` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `grassland` ADD UNIQUE INDEX `grassland_id_company_name_id_prefered_breed_grass_type` (`id_company`, `name`, `id_prefered_breed`, `grass_type`);

# FOR MODEL CORRAL > DEPENDS ON COMPANY, (SELF)CORRAL.
CREATE TABLE IF NOT EXISTS `corral` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `name` VARCHAR(255) NOT NULL DEFAULT 'Test corral.', `coordinates` VARCHAR(255) NOT NULL DEFAULT '0', `dimentions` VARCHAR(255) NOT NULL DEFAULT '10x10m', `left` INTEGER DEFAULT 1, `right` INTEGER DEFAULT 2, `observation` VARCHAR(255) NOT NULL DEFAULT 'No observations', `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`left`) REFERENCES `corral` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`right`) REFERENCES `corral` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `corral` ADD UNIQUE INDEX `corral_id_company_name_coordinates` (`id_company`, `name`, `coordinates`);

# FOR MODEL ANIMAL > DEPENS ON MODEL COMPANY, BREED, CATEGORY, SUPPLIER.
CREATE TABLE IF NOT EXISTS `animal` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `sex` TINYINT(1) NOT NULL DEFAULT false, `ident` VARCHAR(255) NOT NULL DEFAULT '0', `id_breed` INTEGER DEFAULT 1, `birthdate` DATETIME NOT NULL DEFAULT now(), `id_category` INTEGER DEFAULT 1, `id_supplier` INTEGER DEFAULT 1, `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_breed`) REFERENCES `breed` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_supplier`) REFERENCES `supplier` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `animal` ADD UNIQUE INDEX `animal_id_company_ident` (`id_company`, `ident`);

# FOR MODEL ANIMAL LOCATION > DEPENDS ON COMPANY, ANIMAL, CORRAL, OPERATION.
CREATE TABLE IF NOT EXISTS `animal_location` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `id_corral` INTEGER DEFAULT 1, `id_animal` INTEGER DEFAULT 1, `date` DATETIME NOT NULL DEFAULT now(), `id_operation` INTEGER DEFAULT 1, `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_corral`) REFERENCES `corral` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_animal`) REFERENCES `animal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_operation`) REFERENCES `operation` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `animal_location` ADD UNIQUE INDEX `unique_index_animal_location` (`id_company`, `id_corral`, `id_animal`, `id_operation`, `date`, `deleted`);

# FOR MODEL GRAZING > DEPENDS ON COMPANY, GRASSLAND, ANIMAL, CORRAL.
CREATE TABLE IF NOT EXISTS `grazing` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `id_grassland` INTEGER DEFAULT 1, `id_animal` INTEGER DEFAULT 1, `id_corral` INTEGER DEFAULT 1, `date` DATETIME NOT NULL DEFAULT now(), `completed` TINYINT(1) NOT NULL DEFAULT false, `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_grassland`) REFERENCES `grassland` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_animal`) REFERENCES `animal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_corral`) REFERENCES `corral` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `grazing` ADD UNIQUE INDEX `grazing_index` (`id_company`, `id_grassland`, `id_animal`, `id_corral`);

# FOR MODEL LABOR > DEPENDS ON COMPANY, CORRAL, GRASSLAND, ANIMAL, OPERATION.
CREATE TABLE IF NOT EXISTS `labor` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `name` VARCHAR(255) NOT NULL DEFAULT 'Test Labor.', `description` VARCHAR(255) NOT NULL DEFAULT 'Test Grassland description.', `id_corral` INTEGER DEFAULT 1, `id_grassland` INTEGER DEFAULT 1, `id_animal` INTEGER DEFAULT 1, `date` DATETIME NOT NULL DEFAULT now(), `id_operation` INTEGER DEFAULT 1, `completed` TINYINT(1) NOT NULL DEFAULT false, `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_corral`) REFERENCES `corral` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_grassland`) REFERENCES `grassland` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_animal`) REFERENCES `animal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_operation`) REFERENCES `operation` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `labor` ADD UNIQUE INDEX `labor_unique_index` (`id_company`, `name`, `id_animal`, `id_corral`, `date`, `id_operation`, `deleted`);

# FOR MODEL TROOP_ANIMAL > DEPENDS ON COMPANY, TROOP, ANIMAL.
CREATE TABLE IF NOT EXISTS `troop_animal` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `id_animal` INTEGER DEFAULT 1, `id_troop` INTEGER NOT NULL DEFAULT 1, `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_animal`) REFERENCES `animal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_troop`) REFERENCES `troop` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `troop_animal` ADD UNIQUE INDEX `troop_animal_id_company_id_troop_id_animal_deleted` (`id_company`, `id_troop`, `id_animal`, `deleted`);

# FOR MODEL TROOP_LOCATION > DEPENDS ON COMPANY, CORRAL, TROOP, GRASSLAND
CREATE TABLE IF NOT EXISTS `troop_location` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `id_corral` INTEGER DEFAULT 1, `id_troop` INTEGER DEFAULT 1, `id_grassland` INTEGER DEFAULT 1, `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_corral`) REFERENCES `corral` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_troop`) REFERENCES `troop` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_grassland`) REFERENCES `grassland` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `troop_location` ADD UNIQUE INDEX `troop_location_id_company_id_corral_id_troop_id_grassland` (`id_company`, `id_corral`, `id_troop`, `id_grassland`);

# FOR MODEL WEIGHT > DEPENDS ON COMPANY, ANIMAL.
CREATE TABLE IF NOT EXISTS `weight` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `id_animal` INTEGER DEFAULT 1, `date` DECIMAL(20,4) NOT NULL DEFAULT 0, `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_animal`) REFERENCES `animal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `weight` ADD UNIQUE INDEX `weight_index` (`id_company`, `id_animal`, `date`, `deleted`);

# FOR MODEL BRETEADO > DEPENDS ON COMPANY, ANIMAL, OPERATION
CREATE TABLE IF NOT EXISTS `breteado` (`id` INTEGER NOT NULL auto_increment , `id_company` INTEGER DEFAULT 1, `id_animal` INTEGER DEFAULT 1, `id_operation` INTEGER DEFAULT 1, `date` DATETIME NOT NULL DEFAULT now(), `period` VARCHAR(255) NOT NULL DEFAULT '1 day', `deleted` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id_company`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_animal`) REFERENCES `animal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`id_operation`) REFERENCES `operation` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE=InnoDB;
ALTER TABLE `breteado` ADD UNIQUE INDEX `breteado_id_company_id_animal_id_operation_date_deleted` (`id_company`, `id_animal`, `id_operation`, `date`, `deleted`);