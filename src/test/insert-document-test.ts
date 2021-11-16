import {connect} from '../mongodb/connect'

const insertDocumentTest = async() => {
  let connection, cursor
  try {
    connection = await connect()
    const db = await connection.db('mongodb') // mongodb라는 데이터베이스를 생성하는 코드
    const personsCollection = db.collection('persons') // persons라는 이름을 가진 컬렉션 생성
    const addressesCollection = db.collection('addresses') // addresses라는 이름을 가진 컬렉션 생성
    
    const person = {name:'Jack', age: 32}
    let result = await personsCollection.insertOne(person)
    console.log(result)

    const address = {country: 'korea', city: 'seoul'}
    result = await addressesCollection.insertOne(address)
    console.log(result)
  } catch(e) {
    console.log(e.message)
  } finally {
    connection.close()
  }  
}

insertDocumentTest()