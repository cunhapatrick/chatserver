// Chatroom
module.exports = server => {
  const io = require('socket.io')(server)
  let addedUser = false
  io.on('connection', socket => {
    // Add user on the private group and alert the other member
    socket.on('add user', user => {
      if (addedUser) return
      socket.username = user.name
      addedUser = true
      socket.group = io.of(`/${user.nsp}`)
        .socket.group.emit('msg', { username: socket.username, message: 'A user is connected' })

      socket.group.on('connection', () => console.log('user is connected'))
      // send message to a private socket namespace
      socket.group.on('msg', msg => socket.group.emit('msg', { username: socket.username, msg }))
      // inform the other user has left the chat
      socket.group.on('disconnect', () => addedUser ? socket.group.emit('user left', socket.username) : '')
    })
  })

  // Client side code
  /*
    let socket = io-client()
    socket.emit('add user',{username:name,nsp:group})
    socket = io-client(`/${group}`)
    socket.emit('msg',msg)
    socket.on('msg',data=>{
      if data.username === name return
      return data.msg
    })
  */
}
