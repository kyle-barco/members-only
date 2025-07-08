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
        m.date
      FROM messages AS m
      LEFT JOIN users AS u ON u.id = m.id
      ORDER BY m.date DESC;
        
    `)
    return rows
  }
}

module.exports = queries
