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
