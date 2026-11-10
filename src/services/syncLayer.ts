// Real-time Multi-Platform Sync Layer for Mario Digital Twin
// Supports Web, Electron/Tauri, Capacitor (Android/iOS) via BroadcastChannel + StorageSync

const CHANNEL_NAME = 'mario_twin_ecosystem_sync';

export interface SyncPayload {
  type: 'DECISION_ADD' | 'FINANCIAL_UPDATE' | 'SENTINEL_DISPATCH' | 'HEARTBEAT';
  timestamp: number;
  originPlatform: string;
  data: any;
}

export class TwinSyncLayer {
  private channel: BroadcastChannel | null = null;
  private listeners: ((payload: SyncPayload) => void)[] = [];
  public platform: string = 'web';

  constructor() {
    this.detectPlatform();
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel(CHANNEL_NAME);
      this.channel.onmessage = (event) => {
        this.notifyListeners(event.data);
      };
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === 'mario_twin_sync_event' && e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            this.notifyListeners(parsed);
          } catch (err) {
            console.error('Storage sync parse error:', err);
          }
        }
      });
    }
  }

  private detectPlatform() {
    if (typeof window === 'undefined') {
      this.platform = 'server';
      return;
    }
    const win = window as any;
    if (win.__TAURI_INTERNALS__ || win.__TAURI__) {
      this.platform = 'mac-desktop';
    } else if (win.Capacitor?.getPlatform() === 'android') {
      this.platform = 'android';
    } else if (win.Capacitor?.getPlatform() === 'ios') {
      this.platform = 'ios';
    } else if (win.matchMedia('(display-mode: standalone)').matches || win.navigator.standalone) {
      this.platform = 'pwa-standalone';
    } else {
      this.platform = 'web';
    }
  }

  public subscribe(cb: (payload: SyncPayload) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  public broadcast(type: SyncPayload['type'], data: any) {
    const payload: SyncPayload = {
      type,
      timestamp: Date.now(),
      originPlatform: this.platform,
      data,
    };

    if (this.channel) {
      this.channel.postMessage(payload);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('mario_twin_sync_event', JSON.stringify(payload));
    }
    // Also notify local listeners
    this.notifyListeners(payload);
  }

  private notifyListeners(payload: SyncPayload) {
    this.listeners.forEach((cb) => {
      try {
        cb(payload);
      } catch (err) {
        console.error('Sync listener error:', err);
      }
    });
  }
}

export const syncLayer = new TwinSyncLayer();

