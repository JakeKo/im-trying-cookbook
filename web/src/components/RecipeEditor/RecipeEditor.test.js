import { render } from '@redwoodjs/testing';

import RecipeEditor from './RecipeEditor';

describe('RecipeEditor', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<RecipeEditor />);
        }).not.toThrow();
    });
});
