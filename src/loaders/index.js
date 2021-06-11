import expressLoader from './express';
import webSocketLoader from './webSocket';

export async function appLoader ({ app }) {
  await expressLoader({ app });
};

export async function serverLoader ({ server }) {
  await webSocketLoader({ server });
}
