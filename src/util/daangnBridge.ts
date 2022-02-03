import { Bridge } from '@daangn/webview-bridge-modern';
import { PluginRouter } from '@daangn/webview-bridge-modern/lib/plugins/Router';

export const daangnBridge = new Bridge().addPlugin(PluginRouter);
