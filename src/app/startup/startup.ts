import { Injectable } from "@angular/core";
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { Observable } from "rxjs";


@Injectable(
    {providedIn: 'root'}
)
export class Startup {

    constructor() {
    }

    preLoad(): Observable<void> {
        return this.init();
    }

    private init(): Observable<void>{
        return new Observable<void>(observer => {
            observer.next();
            observer.complete();
        });
    }

    private async setupFileOpenListener() {
        if (!Capacitor.isNativePlatform()) return;

        // 监听运行中被其他 App 打开
        App.addListener('appUrlOpen', (event) => {
            console.log('收到文件:', event.url);
            this.handleIncomingFile(event.url);
        });

        // 监听冷启动时被打开（从桌面图标以外启动）
        const launchUrl = await App.getLaunchUrl();
        if (launchUrl?.url) {
            this.handleIncomingFile(launchUrl.url);
        }
    }

    private handleIncomingFile(url: string) {
        // url 可能是 content://、file:// 或 iOS 的类似路径
        // 后续这里可以跳转到数据填报页，并带上文件信息
        console.log('处理文件 URI:', url);
    }

}
