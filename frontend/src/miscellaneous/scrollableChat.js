import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../context/chatProvider'
import { isSameSender ,isLastMessage, isSameSenderMargin, isSameUser} from '../config/chatLogic';
import { Tooltip } from '../components/ui/tooltip';
import { Avatar } from '../components/ui/avatar';
function ScrollableChat({messages}) {
   const{user} =ChatState();
  return (  
    <ScrollableFeed>
        {messages && 
        messages.map((m,i)=>(
         <div style={{display:"flex"}} key={m._id}>
              {(isSameSender(messages,m,i,user._id)
              || isLastMessage(messages,i,user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom" hasArrow>
                    <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}

                    />
              </Tooltip>
              )}
              <span style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3  : 10,                
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}>
                    {m.content}   
              </span>   
         </div>
        ))}
         
    </ScrollableFeed>
  )
}

export default ScrollableChat
