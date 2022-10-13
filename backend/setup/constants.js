module.exports = {
    rows_count: 40,
    tasks: {
        "pb_mentor_1": { open_student: false, open_ta: true, length: 15, markus_id: 22, exclude: [] },
        "pb_mentor_2": { open_student: false, open_ta: true, length: 15, markus_id: 22, exclude: [] },
        "pb": { open_student: false, open_ta: true, length: 30, markus_id: 22, exclude: ["pf"] },
        "pf_mentor_1": { open_student: false, open_ta: true, length: 15, markus_id: 23, exclude: [] },
        "pf_mentor_2": { open_student: false, open_ta: true, length: 15, markus_id: 23, exclude: [] },
        "pf": { open_student: false, open_ta: true, length: 60, markus_id: 23, exclude: ["pb"] },
        "a1": { open_student: false, open_ta: true, length: 10, markus_id: 19, exclude: [] },
        "a2": { open_student: false, open_ta: true, length: 10, markus_id: 20, exclude: [] },
        "a3": { open_student: false, open_ta: true, length: 10, markus_id: 21, exclude: [] }
    },
    weights: { "a1": 10, "a2": 15, "a3": 20, "pb": 25, "pf": 30 },
    max: { "pf": 50 },
    sql_times: "SELECT to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI') AS time, COUNT(*) AS all_count, COUNT(student) AS booked_count, location FROM interviews WHERE task = ($1) AND ta != ALL(SELECT ta FROM interviews WHERE task = ANY($2) AND student = ($3) AND cancelled IS FALSE) AND time > now() GROUP BY time, location ORDER BY time",
    sql_check: "SELECT id, to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI') AS time, location FROM interviews WHERE student = ($1) AND task = ($2)",
    sql_book: "UPDATE interviews SET student = ($1) WHERE id = (SELECT id FROM interviews WHERE task = ($2) AND time = ($3) AND student IS NULL AND location = ($4) AND ta != ALL(SELECT ta FROM interviews WHERE task = ANY($5) AND student = ($1) AND cancelled IS FALSE) LIMIT 1 FOR UPDATE) RETURNING location",
    sql_cancel: "UPDATE interviews SET student = NULL WHERE id = ($1)"
};