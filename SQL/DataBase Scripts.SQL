--GENERANDO TABLAS
CREATE TABLE "DNA" (
	"string_DNA" TEXT NOT NULL ,
	"fk_id_Dna_Type" INT NOT NULL ,
	PRIMARY KEY("string_DNA")
);

CREATE TABLE "DNAType" (
	"id_Dna_Type" SERIAL NOT NULL ,
	"dna_Type_Desc" VARCHAR(30) NOT NULL ,
	PRIMARY KEY("id_Dna_Type")
);

--GENERANDO RELACIONES
ALTER TABLE "DNA" ADD FOREIGN KEY ("fk_id_Dna_Type") REFERENCES "DNAType" ("id_Dna_Type");



--Procedure to insert DNA chains 
create or replace procedure SP_INSERT_DNA(
   dnaString text,
   dnaType int
)
language plpgsql    
as $$
begin
    -- subtracting the amount from the sender's account 
    insert into "DNA" 
    values (dnaString, dnaType);

    commit;
end;$$

CREATE OR REPLACE FUNCTION fn_get_human_stats()
RETURNS table (
  dnaType integer ,
  quantity bigint
)
AS $$
DECLARE
BEGIN
    return query 
	SELECT "fk_id_Dna_Type" dnaType, COUNT(*) quantity
	FROM public."DNA"
	WHERE "fk_id_Dna_Type" = 1
	GROUP BY "fk_id_Dna_Type"
	UNION ALL
	SELECT '1' dnaType, 0 quantity
	WHERE NOT EXISTS(
	SELECT "fk_id_Dna_Type" dnaType, COUNT(*) quantity
	FROM public."DNA"
	WHERE "fk_id_Dna_Type" = 1
	GROUP BY "fk_id_Dna_Type"		
	);
END;
$$ LANGUAGE plpgsql;


--Function to get the mutant stats stored in the database by fk_id_Dna_Type 2
CREATE OR REPLACE FUNCTION fn_get_mutant_stats()
RETURNS table (
  dnaType integer ,
  quantity bigint
)
AS $$
DECLARE
BEGIN
    return query 
	SELECT "fk_id_Dna_Type" dnaType, COUNT(*) quantity
	FROM public."DNA"
	WHERE "fk_id_Dna_Type" = 2
	GROUP BY "fk_id_Dna_Type"
	UNION ALL
	SELECT '2' dnaType, 0 quantity
	WHERE NOT EXISTS(
	SELECT "fk_id_Dna_Type" dnaType, COUNT(*) quantity
	FROM public."DNA"
	WHERE "fk_id_Dna_Type" = 2
	GROUP BY "fk_id_Dna_Type"	
	);
END;
$$ LANGUAGE plpgsql;


--function to get overall stats with percentage of DNA analyzed types based in all samples stored in the database
create or replace function FN_GET_STATS()
RETURNS table (
  dnaType integer ,
  quantity bigint ,
  percentage float
)
AS $$
DECLARE
BEGIN
	return query 
	SELECT *, (cast(stats.quantity as float)/cast((SELECT COUNT(*) FROM public."DNA") as float)) percentage
	FROM
	(SELECT * from fn_get_human_stats()
	 UNION
	 SELECT * from fn_get_mutant_stats()) stats;
END;
$$ LANGUAGE plpgsql;

INSERT INTO public."DNAType"(
	"id_Dna_Type", "dna_Type_Desc")
	VALUES (DEFAULT, 'Human');
	
INSERT INTO public."DNAType"(
	"id_Dna_Type", "dna_Type_Desc")
	VALUES (DEFAULT, 'Mutant');
