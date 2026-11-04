// @vitest-environment happy-dom
import {describe, it, expect} from 'vitest';
import {render, screen } from '@testing-library/react';
import {Navbar} from '../Shared/Navbar';

describe ('Navbar', () => {
    it ("Shows the name of booking portal", () => {
        render(<Navbar />);

    expect (
        screen.getByText("Booking Portal")
    ).toBeTruthy();

    });

    it("Shows the links to the pages", () => {
        render(<Navbar />);
        expect(screen.getByText("Home")).toBeTruthy();
        expect(screen.getByText("Tjenester")).toBeTruthy();
        expect(screen.getByText("Portfolio")).toBeTruthy();
        expect(screen.getByText("Booking")).toBeTruthy();
    });
    
});
