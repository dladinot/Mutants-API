CREATE FUNCTION public.fn_get_human_stats() RETURNS TABLE(dnatype integer, quantity bigint)
    LANGUAGE plpgsql
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
$$;


ALTER FUNCTION public.fn_get_human_stats() OWNER TO postgres;


CREATE FUNCTION public.fn_get_mutant_stats() RETURNS TABLE(dnatype integer, quantity bigint)
    LANGUAGE plpgsql
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
$$;


ALTER FUNCTION public.fn_get_mutant_stats() OWNER TO postgres;


CREATE FUNCTION public.fn_get_stats() RETURNS TABLE(dnatype integer, quantity bigint, percentage double precision)
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
	return query 
	SELECT *, (cast(stats.quantity as float)/ cast(CASE (SELECT COUNT(*) FROM public."DNA") WHEN 0 THEN 1 ELSE (SELECT COUNT(*) FROM public."DNA") END as float)) percentage
	FROM
	(SELECT * from fn_get_human_stats()
	 UNION
	 SELECT * from fn_get_mutant_stats()) stats;
END;
$$;


ALTER FUNCTION public.fn_get_stats() OWNER TO postgres;


CREATE PROCEDURE public.sp_get_stats()
    LANGUAGE plpgsql
    AS $$
begin
	SELECT *, (cast(quantity as float)/cast((SELECT COUNT(*) FROM public."DNA") as float)) percentage
	FROM
	(SELECT * from fn_get_human_stats()
	 UNION
	 SELECT * from fn_get_mutant_stats()) stats;
end;$$;


ALTER PROCEDURE public.sp_get_stats() OWNER TO postgres;

CREATE PROCEDURE public.sp_insert_dna(IN dnastring text, IN dnatype integer)
    LANGUAGE plpgsql
    AS $$
begin
    -- subtracting the amount from the sender's account 
    insert into "DNA" 
    values (dnaString, dnaType);

    commit;
end;$$;


ALTER PROCEDURE public.sp_insert_dna(IN dnastring text, IN dnatype integer) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public."DNA" (
    "string_DNA" text NOT NULL,
    "fk_id_Dna_Type" integer NOT NULL
);


ALTER TABLE public."DNA" OWNER TO postgres;

CREATE TABLE public."DNAType" (
    "id_Dna_Type" integer NOT NULL,
    "dna_Type_Desc" character varying(30) NOT NULL
);


ALTER TABLE public."DNAType" OWNER TO postgres;


CREATE SEQUENCE public."DNAType_id_Dna_Type_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."DNAType_id_Dna_Type_seq" OWNER TO postgres;


ALTER SEQUENCE public."DNAType_id_Dna_Type_seq" OWNED BY public."DNAType"."id_Dna_Type";


ALTER TABLE ONLY public."DNAType" ALTER COLUMN "id_Dna_Type" SET DEFAULT nextval('public."DNAType_id_Dna_Type_seq"'::regclass);

INSERT INTO public."DNAType" VALUES (1, 'Human');
INSERT INTO public."DNAType" VALUES (2, 'Mutant');


ALTER TABLE ONLY public."DNAType"
    ADD CONSTRAINT "DNAType_pkey" PRIMARY KEY ("id_Dna_Type");


ALTER TABLE ONLY public."DNA"
    ADD CONSTRAINT "DNA_pkey" PRIMARY KEY ("string_DNA");


ALTER TABLE ONLY public."DNA"
    ADD CONSTRAINT "DNA_fk_id_Dna_Type_fkey" FOREIGN KEY ("fk_id_Dna_Type") REFERENCES public."DNAType"("id_Dna_Type");
