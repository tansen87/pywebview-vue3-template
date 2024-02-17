#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'''
Description: 生成客户端主程序
usage: 运行前,请确保本机已经搭建Python3开发环境,且已经安装 pywebview 模块。
'''
import os
import sys
import argparse

import webview

from api.api import API
from src_py.config.config import Config


cfg = Config()    # 配置
api = API()    # 本地接口

cfg.init()


def on_loaded():
    # print('DOM加载完毕')
    pass


def on_closing():
    print('程序关闭')


def WebViewApp(ifCef=False):
    # 是否为开发环境
    Config.devEnv = sys.flags.dev_mode

    # 视图层页面URL
    if Config.devEnv:
        # 开发环境
        MAIN_DIR = f'http://localhost:{Config.devPort}/'
        template = os.path.join(MAIN_DIR, "")    # 设置页面,指向远程
    else:
        # 生产环境
        MAIN_DIR = os.path.join(".", "web")
        template = os.path.join(MAIN_DIR, "index.html")    # 设置页面,指向本地

    # 系统分辨率
    screens = webview.screens
    screens = screens[0]
    width = screens.width
    height = screens.height
    # 程序窗口大小
    initWidth = int(width * 2 / 3)
    initHeight = int(height * 4 / 5)
    minWidth = int(initWidth / 2)
    minHeight = int(initHeight / 2)

    # 创建窗口
    window = webview.create_window(
        title=Config.appName,
        url=template,
        js_api=api,
        width=initWidth,
        height=initHeight,
        min_size=(minWidth, minHeight)
    )

    # 获取窗口实例
    api.setWindow(window)

    # 绑定事件
    window.events.loaded += on_loaded
    window.events.closing += on_closing

    # CEF模式
    guiCEF = 'cef' if ifCef else None

    # 启动窗口
    webview.start(debug=Config.devEnv, http_server=True, gui=guiCEF)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-c", "--cef", action="store_true", dest="if_cef", help="if_cef")
    args = parser.parse_args()

    ifCef = args.if_cef    # 是否开启cef模式

    WebViewApp(ifCef)
