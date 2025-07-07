const connection = require('./pool')

const queries = {
  getAllPosts: async () => {
    const {rows} = await connection.query(`
      SELECT 
        p.id,
        
    `)
  }
}
