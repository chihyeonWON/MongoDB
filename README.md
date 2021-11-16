# MongoDB에 데이터 저장하기

## 몽고DB 설치
```typescript
scoop install mongodb
mongod --install
net start mongodb
```

명령이 정상적으로 실행되면 다음과 같이
```typescript
MongoDB 서비스를 시작합니다.
MongoDB 서비스가 잘 시작되었습니다.
```

## 실습 프로젝트 구성

자바스크립트에서mongodb라는 패키지를 설치
```typescript
npm i -S mongodb
```

타입스크립트에서 @types/mongodb를 추가로 설치
```typescript
npm i -D @types/mongodb
```

## 프로젝트의 package.json 파일

```typescript
{
  "name": "12-2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "chance": "^1.1.7",
    "mkdirp": "^1.0.4",
    "mongodb": "^3.7.3",
    "rimraf": "^3.0.2"
  },
  "devDependencies": {
    "@types/chance": "^1.1.1",
    "@types/mkdirp": "^1.0.1",
    "@types/mongodb": "^3.6.20",
    "@types/node": "^15.3.0",
    "@types/rimraf": "^3.0.0",
    "ts-node": "^9.1.1",
    "typescript": "^4.2.4"
  }
}
```

## 몽고DB에 접속하기

src/mongodb/connect.ts
```typescript
import MongoClient from 'mongodb'

export const connect = (mongoUrl: string = 'mongodb://localhost:27017') => 
  MongoClient.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
```

### 몽고DB 테스트 파일

src/test/connect-test.ts
```typescript
import {connect} from '../mongodb/connect'

const connectTest = async() => {
  let connection
  try {
    connection = await connect()
    console.log('connection OK.', connection)
  } catch(e) {
    console.log(e.message)
  } finally {
    connection.close()
  }  
}

connectTest()
```

### 몽고DB 테스트 파일 실행 코드
```typescript
ts-node ./src/test/connect-test.ts
```

### 몽고DB 테스트 결과
connection OK. MongoClient {
  _events: [Object: null prototype] { newListener: [Function (anonymous)] },
  _eventsCount: 1,
  _maxListeners: undefined,
  s: {
    url: 'mongodb://localhost:27017',
    options: {
      servers: [Array],
      caseTranslate: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      directConnection: true,
      checkServerIdentity: true,
      sslValidate: true,
      dbName: 'test',
      socketTimeoutMS: 0,
      connectTimeoutMS: 10000,
      retryWrites: true,
      useRecoveryToken: true,
      readPreference: [ReadPreference],
      promiseLibrary: [Function: Promise]
    },
    promiseLibrary: [Function: Promise],
    dbCache: Map(0) {},
    sessions: Set(0) {},
    writeConcern: undefined,
    readPreference: ReadPreference {
      mode: 'primary',
      tags: undefined,
      hedge: undefined
    },
    namespace: MongoDBNamespace { db: 'admin', collection: undefined }
  },
  topology: NativeTopology {
    _events: [Object: null prototype] {
      authenticated: [Function (anonymous)],
      error: [Function (anonymous)],
      timeout: [Function (anonymous)],
      close: [Function (anonymous)],
      parseError: [Function (anonymous)],
      fullsetup: [Function],
      all: [Function],
      reconnect: [Function (anonymous)],
      commandStarted: [Function (anonymous)],
      commandSucceeded: [Function (anonymous)],
      commandFailed: [Function (anonymous)],
      serverOpening: [Function (anonymous)],
      serverClosed: [Function (anonymous)],
      serverDescriptionChanged: [Function (anonymous)],
      serverHeartbeatStarted: [Function (anonymous)],
      serverHeartbeatSucceeded: [Function (anonymous)],
      serverHeartbeatFailed: [Function (anonymous)],
      topologyOpening: [Function (anonymous)],
      topologyClosed: [Function (anonymous)],
      topologyDescriptionChanged: [Function (anonymous)],
      joined: [Function (anonymous)],
      left: [Function (anonymous)],
      ping: [Function (anonymous)],
      ha: [Function (anonymous)],
      connectionPoolCreated: [Function (anonymous)],
      connectionPoolClosed: [Function (anonymous)],
      connectionCreated: [Function (anonymous)],
      connectionReady: [Function (anonymous)],
      connectionClosed: [Function (anonymous)],
      connectionCheckOutStarted: [Function (anonymous)],
      connectionCheckOutFailed: [Function (anonymous)],
      connectionCheckedOut: [Function (anonymous)],
      connectionCheckedIn: [Function (anonymous)],
      connectionPoolCleared: [Function (anonymous)]
    },
    _eventsCount: 34,
    _maxListeners: Infinity,
    s: {
      id: 0,
      options: [Object],
      seedlist: [Array],
      state: 'connected',
      description: [TopologyDescription],
      serverSelectionTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,
      minHeartbeatFrequencyMS: 500,
      Cursor: [class Cursor extends CoreCursor],
      bson: BSON {},
      servers: [Map],
      sessionPool: [ServerSessionPool],
      sessions: Set(0) {},
      promiseLibrary: [Function: Promise],
      credentials: undefined,
      clusterTime: null,
      connectionTimers: Set(0) {}
    },
    serverApi: undefined,
    [Symbol(kCapture)]: false,
    [Symbol(waitQueue)]: Denque {
      _head: 2,
      _tail: 2,
      _capacity: undefined,
      _capacityMask: 3,
      _list: [Array]
    }
  },
  [Symbol(kCapture)]: false
}
```

## 데이터베이스 연결

데이터베이스시스템은 여러 개의 데이터베이스를 담을 수 있으며 각 데이터베이스는 고유한 자신만의 이름을 가진다.
다음 코드는 'mongodb'라는 이름의 데이터베이스를 생성하는 코드이다.
```typescript
const db = connection.db('mongodb')
```

## 데이터베이스 생성 코드를 connect-test.ts 파일에 넣고 새로운 makedb-test.ts 파일을 생성

src/test/makedb-test.ts
```typescript
import {connect} from '../mongodb/connect'

const connectTest = async() => {
  let connection
  try {
    connection = await connect()
    const db = await connection.db('mongodb')
    console.log('mongodb', db)
  } catch(e) {
    console.log(e.message)
  } finally {
    connection.close()
  }  
}

connectTest()
```

## 컬렉션이란?

일반적으로 관계형 DB는 테이블(table)을 만들고 여기에 관련된 데이터를 저장하는데, 테이블에 저장되는 한 개의 데이터를 레코드(record)라고 한다.
몽고DB도 개념적으로는 관계형 DB 테이블이라는 용어 대신에 컬렉션(collection)을 사용하고 레코드라는 용어 대신에 문서(document)를 사용한다.

### 컬렉션(collection) persons, addresses 라는 이름의 컬렉션을 생성하는 코드
```typescript
const personsCollection = collection.db('persons')
const addressessCollection = collection.db('addresses')
```

### makedb-test.ts 파일에 위의 persons, addresses 컬렉션 두개를 생성하는 코드를 추가

src/test/makedb-test.ts
```typescript
import {connect} from '../mongodb/connect'

const connectTest = async() => {
  let connection
  try {
    connection = await connect()
    const db = await connection.db('mongodb') // mongodb라는 데이터베이스를 생성하는 코드
    const personsCollection = collection.db('persons') // persons라는 이름을 가진 컬렉션 생성
    const addressesCollection = collection.db('addresses') // addresses라는 이름을 가진 컬렉션 생성
    console.log(personsCollection, addressesCollection)
  } catch(e) {
    console.log(e.message)
  } finally {
    connection.close()
  }  
}

connectTest()
```

### 문서를 컬렉션에 저장하기

컬렉션에 한 개의 문서를 저장하는 것은 컬렉션 객체가 제공하는 insertOne 메서드를 사용한다.

다음코드는 persons 컬렉션에 name과 age라는 속성을 지닌 person 객체를 insertOne 메서드를 사용하여 저장하는 코드이다.
```typescript
const personsCollection = db.collection('persons')
const person = {name:'Jack', age: 32}
let result = await personsCollection.insertOne(person)
```

### 앞서 작성한 makedb-test.ts 파일에 person객체와 address 객체를 각각 personsCollection과 addressesCollection에 저장하는 insert-document-test.ts 파일생성

src/test/insert-document-test.ts
```typescript
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
```

## 몽고 셸에 접속하기

데이터를 저장했으니 몽고 셸에서 실제 데이터가 저장되었는지 확인하는 방법
VSCode 터미널에서 다음 명령을 실행해 몽고 셸에 접속한다.
```typescript
mongo
```

현재 mongodb 라는 이름의 데이터베이스를 만들었으므로 몽고 셸에서 다음 명령으로 mongodb 데이터베이스에 연결한다.
```typescript
use mongodb
// switched to db mongodb
```

이처럼 switched to db mongodb 문구가 뜨면 정상 연결된것이고 컬렉션에 저장된 문서들은 다음 명령으로 검색해 볼 수 있다.
```typescript
db.persons.find({})
// { "_id" : ObjectId("61933f9d69ddce0b1c954931"), "name" : "Jack", "age" : 32 }
db.addresses.find({})
// { "_id" : ObjectId("61933f9d69ddce0b1c954932"), "country" : "korea", "city" : "seoul" }
```

몽고 셸에서 빠져나오려면 Ctrl + D 키를 누른다.

## \_id 속성과 ObjectId 타입

모든 몽고DB 문서는 \_id라는 이름의 속성이 있는데 이 속성은 문서가 DB에 저장될 때 자동으로 만들어진다. 앞의 몽고 셸에서 \_id 값은 ObjectId('문자열') 형태로 출력되는데
프로그램에서 ObjectId는 다음 코드로 얻을 수 있다.
```typescript
import {ObjectId} from 'mongodb'
```

## 문서 찾기

특정 컬렉션에 담긴 문서들은 다음과 같은 형식의 코드로 얻을 수 있다. 참고로 find 메서드는 자바스크립트 배열에서 찾은 객체를 주지않고, 일단 cursor라는 이름의 객체를 반환한다.
그리고 cursor객체의 toArray 메서드로 자바스크립트 배열을 얻을 수 있다.
```typescript
let cursor = await.컬렉션객체.find(검색 조건 객체)
const foundResult = await.cursor.toArray()
```

다음 코드는 personsCollection에 저장된 문서 중 name의 속성값이 'Jack'인 문서를 찾는 예이다.
```typescript
cursor = personsCollection.find({name: 'Jack'})
```

조건없이 모든 문서를 얻으려면 다음처럼 검색조건에 빈객체 {}를 사용한다
```typescript
cursor = addressesCollection.find({})
```

위의 cursor 객체와 find메서드 모든 문서르 얻는 빈 객체의 예제 파일인 find-test.ts를 생성

src/test/find-test.ts
```typescript
import {connect} from '../mongodb/connect'

const findDocumentTest = async() => {
    let connection, cursor
    try {
        connection = await connect()
        const db = await connection.db('mongodb')
        const personsCollection = db.collection('persons')
        const addressesCollection = db.collection('addresses')

        cursor = personsCollection.find({name: 'Jack'})
        const foundPersons = await cursor.toArray()
        console.log(foundPersons)

        cursor = addressesCollection.find({})
        const foundAddresses = await cursor.toArray()
        console.log(foundAddresses) 
    } catch(e) {
        console.log(e.message)
    } finally {
        connection.close()
    }
}

findDocumentTest()
```

#### find-test.ts 파일 실행 코드
```typescript
ts-node ./src/test/find-test.ts
```

#### find-test.ts 파일 실행 결과

name이 Jack인 객체를 가진 persons 컬렉션과 find메서드에 빈 객체를 넣은 addresses 컬렉션이 자바스크립트 배열로 출력된다.
```typescript
[ { _id: 61933f9d69ddce0b1c954931, name: 'Jack', age: 32 } ]
[ { _id: 61933f9d69ddce0b1c954932, country: 'korea', city: 'seoul' } ]
```

#### 컬렉션 객체의 findOne 메서드

findOne 메서드는 검색 조건에 맞는 문서를 한 개만 찾아준다. 
문서가 한 개이므로 findOne은 cursor를 반환하지 않고 문서 객체 자체를 반환한다.
```typescript
const result = await 컬렉션객체.findOne(검색 조건 객체)
```
src/test/findOne-test.ts
```typescript
import {connect} from '../mongodb/connect'
import {ObjectId} from 'mongodb'

const findOneTest = async() => {
    let connection, cursor
    try {
        connection = await connect()
        const db = await connection.db('mongodb')
        const personsCollection = db.collection('persons')

        cursor = personsCollection.find({})
        const foundPersons = await cursor.toArray()

        const _id = foundPersons[0]._id
        const result = await personsCollection.findOne({_id})
        console.log(result)
    } catch(e) {
        console.log(e.message)
    } finally {
        connection.close()
    }
}

findOneTest()
```

#### findOne-test.ts 파일 실행 코드
```typescript
ts-node ./src/test/findOne-test.ts
```

#### findOne-test.ts 파일 결과
```typescript
{ _id: 61933f9d69ddce0b1c954931, name: 'Jack', age: 32 }
```

## 문서 삭제하기

컬렉션에 담긴 문서는 deleteOne 혹은 deleteMany 메서드를 사용하면 삭제할 수 있다. 이 두 메서드는 deleteCount라는 이름의 속성에 삭제된 문서의 개수가 담긴 객체를 반환한다.
```typescript
let result = await 컬렉션객체.deleteOne(검색 조건 객체)
result = await 컬랙션객체.deleteMany(검색 조건 객체)
```
문서를 한 개 생성할 때는 insertOne메서드를 사용했지만 동시에 문서를 여러개 생성할때는 insertMany 메서드를 사용한다. 
다음 코드는 insertMany로 문서를 여러 개 생성하고 deleteOne과 deleteMany 메서드를 사용해 문서를 다시 삭제하는 내용을 구현한 예이다

```typescript
import {connect} from '../mongodb/connect'

const deleteTest = async() => {
    let connection, cursor
    try {
        connection = await connect()
        const db = await connection.db('mongodb')
        const personsCollection = db.collection('persons')
        await personsCollection.insertMany([
            {name: 'Jack'}, {name: 'Tom'}, {name: 'Jane'}
        ])

        let result = await personsCollection.deleteOne({name: 'Tom'})
        console.log(result) // deleteCount: 1
        result = await personsCollection.deleteMany({})
        console.log(result) // deleteCount: 2
    } catch(e) {
        console.log(e.message)
    } finally {
        connection.close()
    }
}

deleteTest()
```
