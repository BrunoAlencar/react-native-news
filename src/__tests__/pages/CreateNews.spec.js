import React from 'react';

import CreateNews from '../../CreateNews'
import { render } from '@testing-library/react-native';

describe('CreateNews page', () => {
    it('should contain title/text/author inputs', () => {
        const { getByPlaceholderText } = render(<CreateNews/>)

        expect(getByPlaceholderText('Título da notícia')).toBeTruthy()
        expect(getByPlaceholderText('Texto da notícia')).toBeTruthy()
        expect(getByPlaceholderText('Autor')).toBeTruthy()
    })
})