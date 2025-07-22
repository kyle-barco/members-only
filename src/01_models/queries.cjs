const connection = require('./pool.cjs')

const queries = {
  getAllPosts: async () => {
    const {rows} = await connection.query(`
      SELECT 
        m.id,
        COALESCE(u.fullname, 'Anonymous') AS full_name,
        u.username,
        m.title,
        m.message_text,
        m.created_at
      FROM messages AS m
      LEFT JOIN users AS u ON u.id = m.id
      ORDER BY m.created_at DESC;
        
    `)
    return rows
  },

  createUser: async (fullname, username, password) => {
    await connection.query(`
      INSERT INTO users
        (fullname, username, password, is_member)
      VALUES
        ($1, $2, $3, 'registered');
    `, [fullname, username, password])

  },

  getUserFromUname: async(username) => {
    const { rows } = await connection.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    )
    return rows[0]
  },

  getUserFromId: async(id) => {
      const { rows } = await connection.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
      )
    return rows[0]
    }

}

module.exports = queries
