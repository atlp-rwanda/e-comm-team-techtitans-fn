import { render,screen } from '@testing-library/react';
import React from 'react';
import Greet from "../../../src/components/Greet/Greet"

test('Greet renders correctly',()=>{
render(<Greet/>)
const textElement= screen.getByText("Hello")
expect(textElement).toBeInTheDocument()
})