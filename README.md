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


