import { LexRuntime } from 'aws-sdk'

const lexRuntime = new LexRuntime()

export const handler = ({ text }, context, callback) => {
  lexRuntime.postText({
    botName: 'LexTest',
    botAlias: 'Latest',
    inputText: text,
    userId: Date.now()
  }, (error, data) => {
    if (error) {
      callback(error, error.stack)
    } else {
      callback(null, data)
    }
  })
}
