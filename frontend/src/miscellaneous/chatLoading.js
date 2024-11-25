import React from 'react'
import { SkeletonText } from "../components/ui/skeleton"
function ChatLoading() {
  return (

         <SkeletonText
         display="flex"
         overflow="hidden"
          noOfLines={7} gap="4" />
        
  )
}

export default ChatLoading

