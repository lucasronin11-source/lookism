import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { query } from '../utils/db';

export const login = async (req: Request, res: Response) => {
    const { fullName, password } = req.body;

    if (!fullName || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const nameParts = fullName.trim().split(' ', 2);
    const firstName = nameParts[0];
    const lastName = nameParts[1] || '';

    try {
        const result = await query(
            'SELECT * FROM users WHERE first_name = $1 AND last_name = $2',
            [firstName, lastName]
        );
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password!' });
        }

        // Set session or JWT here if needed
        return res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        return res.status(500).json({ message: 'Database error occurred', error });
    }
};