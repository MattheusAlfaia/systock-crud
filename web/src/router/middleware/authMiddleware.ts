import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationRaw } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

export const authMiddleware = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();
  if(!authStore.isAuthenticated && to.path !== '/auth/login'){
    next({ path: '/auth/login' } as RouteLocationRaw);
  } else {
    next();
  }
};