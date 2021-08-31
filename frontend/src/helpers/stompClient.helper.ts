import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const stompClient = Stomp.over(() => new SockJS('/api/ws'));
