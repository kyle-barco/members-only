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
        (fullname, username, password, member_status)
      VALUES
        ($1, $2, $3, 'registered');
    `, [fullname, username, password])

  },

  createPost: async (title, content, id) => {
    await connection.query(`
      INSERT INTO messages (title, content, id) 
      VALUES ($1, $2, $3)
    `,[title, content, id])
  },

  deletePost: async(id) => {
    await connection.query(`
      DELETE FROM messages 

    `)
  },


  // USER QUERIES
  getUserFromUname: async(username) => {
    const { rows } = await connection.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    )
    return rows[0]
  },
  
  getAllUsers: async() => {
    const { rows } = await connection.query(`
      SELECT 
        users.id,
        users.fullname,
        users.member_status,
        COUNT(messages.id) AS messages_count
      FROM
        users
      LEFT JOIN
        messages ON users.id = messages.id
      GROUP BY
        user.id, users.fullname, users.username, users.member_status
      ORDER BY 
        users.id
    `)
    return rows;
  },

  getUserFromId: async(id) => {
      const { rows } = await connection.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
      )
    return rows[0]
    },

  giveUserMembership: async(id) => {
    await connection.query(`
      UPDATE users
      SET member_status = 'member'
      WHERE id = $1
    `, [id])
  },

}

module.exports = queries
