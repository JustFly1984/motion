import * as React from "react"
import { motion, useCycle, MagicMotion, AnimatePresence } from "@framer"
import styled from "styled-components"

const Container = styled.div`
    width: 200px;
    height: 340px;
    overflow: visible;
    background-color: #f3f3f3;
    border-radius: 20px;
    position: relative;
`

const Small = styled(motion.div)`
    width: 60px;
    height: 60px;
    overflow: visible;
    border-radius: 10px;
    position: absolute;

    ${({ purple }) =>
        purple
            ? `
      background-color: #85f;
      top: 30px;
      left: 30px;
    `
            : `
      background-color: #0099ff;
      top: 172px;
      left: 102px;
    `}
`
const Big = styled(motion.div)`
    overflow: visible;
    position: absolute;

    ${({ purple }) =>
        purple
            ? `
            top: 137px;
            left: 26px;
            width: 120px;
            height: 120px;
          background-color: rgba(136, 85, 255, 0.3); 
          border-radius: 20px;
    `
            : `
            top: 110px;
            left: 40px;
            width: 60px;
            height: 60px;
           background-color: rgba(0, 153, 255, 0.3);
           border-radius: 10px;
    `}
`

const Child = () => {
    return (
        <Big magicId="big" purple>
            <Small magicId="small" purple />
        </Big>
    )
}

const Sibling = () => {
    return (
        <>
            <Big magicId="big" />
            <Small magicId="small" />
        </>
    )
}

export const App = () => {
    const [isOn, toggleOn] = useCycle(false, true)

    return (
        <Container onClick={() => toggleOn()}>
            <MagicMotion transition={{ duration: 2 }}>
                <AnimatePresence>
                    <Child />
                    {isOn && (
                        <motion.div
                            key="siblings"
                            initial={false}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 20 } }}
                        >
                            <Sibling />
                        </motion.div>
                    )}
                </AnimatePresence>
            </MagicMotion>
        </Container>
    )
}
