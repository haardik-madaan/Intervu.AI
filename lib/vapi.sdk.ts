import Vapi from '@vapi-ai/web';

let vapiInstance = null;

if (typeof window !== "undefined") {
  if (!window.__vapiInstance) {
    window.__vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);
  }
  vapiInstance = window.__vapiInstance;
}

export const vapi = vapiInstance;