module.exports = {
	rows_count: 40,
	tasks: {
		"phase_1_mentor_1": { open: true, markus_id: 4, exclude: [] },
		"phase_1_mentor_2": { open: false, markus_id: 4, exclude: [] },
		"phase_1": { open: false, markus_id: 4, exclude: ["phase_2", "phase_3"] },
		"phase_2": { open: false, markus_id: 4, exclude: ["phase_1", "phase_3"] },
		"phase_3": { open: false, markus_id: 4, exclude: ["phase_1", "phase_2"] }
	},
	sql_times: "SELECT to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI') AS time, COUNT(*) AS all_count, COUNT(student) AS booked_count FROM interviews WHERE task = ($1) AND ta != ALL(SELECT ta FROM interviews WHERE task = ANY($2) AND student = ($3)) GROUP BY time ORDER BY time",
	sql_check: "SELECT id, to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI') AS time FROM interviews WHERE student = ($1) AND task = ($2)",
	sql_book: "UPDATE interviews SET student = ($1) WHERE id = (SELECT id FROM interviews WHERE task = ($2) AND time = ($3) AND student IS NULL AND ta != ALL(SELECT ta FROM interviews WHERE task = ANY($4) AND student = ($1)) LIMIT 1 FOR UPDATE)",
	sql_cancel: "UPDATE interviews SET student = NULL WHERE id = ($1)"
};