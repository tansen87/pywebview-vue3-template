#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'''
Description: 系统类
usage: 调用window.pywebview.api.<methodname>(<parameters>)从Javascript执行
'''

import os
import json

import webview
from pandas import read_csv

from src_py.config.config import Config


class System():
    '''系统类'''
    window = None

    def system_py2js(self, func, info):
        '''调用js中挂载到window的函数'''
        infoJson = json.dumps(info)
        System.window.evaluate_js(f"{func}('{infoJson}')")

    def system_getAppInfo(self):
        '''程序基础配置信息'''
        return {
            'appName': Config.appName,  # 应用名称
            'appVersion': Config.appVersion  # 应用版本号
        }

    def system_pyCreateFileDialog(self, file_types=['全部文件 (*.*)'], directory=''):
        '''打开文件对话框'''
        # file_types = ['Excel表格 (*.xlsx;*.xls)']
        file_types = tuple(file_types)
        result = System.window.create_file_dialog(dialog_type=webview.OPEN_DIALOG, directory=directory, allow_multiple=True, file_types=file_types)
        result_list = list()
        if result is not None:
            for res in result:
                file_path_list = os.path.split(res)
                dir = file_path_list[0]
                filename = file_path_list[1]
                ext = os.path.splitext(res)[-1]
                result_list.append({
                    'filename': filename,
                    'ext': ext,
                    'dir': dir,
                    'path': res
                })
        return result_list

    def system_open_file(self, encoding, sep):
        '''打开文件'''
        file_types = ['csv(*.csv;*.txt;*.dat;*.spext;*.tsv)']
        directory = ''
        try:
            self.encoding = encoding
            self.sep = sep
            file_types = tuple(file_types)
            self.result = System.window.create_file_dialog(
                dialog_type=webview.OPEN_DIALOG, directory=directory, allow_multiple=True, file_types=file_types)

            check_df = read_csv(
                self.result[0], dtype=str, nrows=5, encoding=self.encoding, sep=self.sep
            )

            df_json = check_df.to_json(orient='records', force_ascii=False)

            return df_json
        except Exception as e:
            print(f"system_open_file error: {e}")

    def system_display(self):
        check_df = read_csv(
            self.result[0], dtype=str, nrows=5, encoding=self.encoding, sep=self.sep
        )
        print(f"{check_df}")  # test-dele
        df_json = check_df.to_json(orient='records', force_ascii=False)
        print(df_json)  # test-dele
        return df_json

    def system_get_data(self, data):
        self.col = data['_value']
        print(f"home send data: {data['_value']}")  # test-dele

    def system_generate_data(self):
        print('generation')
        pass
