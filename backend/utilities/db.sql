CREATE TABLE user_info
(
    username character varying NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL,
    admin boolean NOT NULL DEFAULT false,
    PRIMARY KEY (username)
);

CREATE TABLE user_verification
(
    username character varying NOT NULL,
    code character varying NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
    PRIMARY KEY (username),
    CONSTRAINT username FOREIGN KEY (username)
        REFERENCES user_info (username) MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

CREATE TABLE course
(
    course_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 ),
    course_code character varying(256) NOT NULL,
    course_session character varying(256) NOT NULL,
    hidden boolean NOT NULL DEFAULT false,
    PRIMARY KEY (course_id),
    UNIQUE (course_code, course_session)
);

CREATE TABLE course_role
(
    username character varying NOT NULL,
    course_id integer NOT NULL,
    role character varying NOT NULL,
    PRIMARY KEY (username, course_id),
    CONSTRAINT username FOREIGN KEY (username)
        REFERENCES user_info (username) MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    CONSTRAINT course_id FOREIGN KEY (course_id)
        REFERENCES course (course_id) MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);

CREATE TABLE ddah
(
    username character varying NOT NULL,
    duty character varying NOT NULL,
    "time" integer NOT NULL,
    supervisor_prepared timestamp with time zone,
    chair_approved timestamp with time zone,
    ta_accepted timestamp with time zone,
    PRIMARY KEY (username, duty),
    CONSTRAINT username FOREIGN KEY (username)
        REFERENCES user_info (username) MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID
);
