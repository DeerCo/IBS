CREATE TABLE interviews
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 ),
    task character varying(50) NOT NULL,
    "time" timestamp with time zone NOT NULL,
    ta character varying(50) NOT NULL,
    student character varying(50),
    length integer,
    location character varying DEFAULT 'Zoom',
    cancelled boolean NOT NULL DEFAULT false,
    note character varying,
    PRIMARY KEY (id)
);

CREATE TABLE text
(
    paragraph bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 ),
    likes bigint NOT NULL DEFAULT 0,
    content character varying,
    PRIMARY KEY (paragraph)
);

CREATE TABLE users
(
    username character varying(256) NOT NULL,
    PRIMARY KEY (username)
);
