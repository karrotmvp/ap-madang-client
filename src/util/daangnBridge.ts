import { Bridge } from '@daangn/webview-bridge-modern';
import { PluginRouter } from '@daangn/webview-bridge-modern/lib/plugins/Router';

const daangnBridge = new Bridge().addPlugin(PluginRouter);
export default daangnBridge;
