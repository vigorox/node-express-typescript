import regRoutes from './api/register/register-routes';
import userRoutes from './api/user/user-routes';
import authRoutes from './api/auth/auth-routes';
import testRoutes from './api/test/test-routes';

export function registerRoutes(app: any) {
    app.use('/api', regRoutes);
    app.use('/api', userRoutes);
    app.use('/api', authRoutes);
    app.use('/api', testRoutes);
}
