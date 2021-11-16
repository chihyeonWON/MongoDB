import {connect} from '../mongodb/connect'

const connectTest = async() => {
  let connection
  try {
    connection = await connect()
    const db = await connection.db('mongodb') // mongodb라는 데이터베이스를 생성하는 코드
    console.log('mongodb', db)
  } catch(e) {
    console.log(e.message)
  } finally {
    connection.close()
  }  
}

connectTest()