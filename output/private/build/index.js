"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 添加百度云API域名和飞书附件域名到白名单
block_basekit_server_api_1.basekit.addDomainList([
    'aip.baidubce.com',
    'feishu.cn',
    'internal-api-drive-stream.feishu.cn'
]);
block_basekit_server_api_1.basekit.addField({
    // 定义捷径的i18n语言资源
    i18n: {
        messages: {
            'zh-CN': {
                'attachmentLabel': '身份证图片',
                'idCardSide': '身份证正反面',
                'front': '人像面',
                'back': '国徽面',
                'name': '姓名',
                'sex': '性别',
                'nation': '民族',
                'birth': '出生日期',
                'address': '住址',
                'idNumber': '身份证号码',
                'issueAuthority': '签发机关',
                'validDateStart': '有效期开始时间',
                'validDateEnd': '有效期结束时间',
                'idCardInfo': '身份证信息',
                'authTip': '请填写百度云API的访问凭证',
                'authHelp': '如何获取百度云API Key和Secret Key?',
                'errorAuthFailed': 'API Key 无效或已过期',
                'errorRateLimit': '请求过于频繁，请稍后再试',
                'errorApiRequest': '服务请求失败，请稍后重试',
                'errorInvalidFormat': 'API 返回格式异常',
                'errorUnknown': '服务异常，请稍后重试',
                'errorNoAttachment': '未找到附件',
                'errorAttachmentFailed': '获取附件失败',
                'errorIdCardRecognition': '身份证识别失败',
                'apiKeyLabel': 'API Key',
                'apiKeyPlaceholder': '请输入百度云API Key',
                'apiKeyTip': '请参考说明文档获取百度云API Key：',
                'apiKeyDoc': '说明文档',
                'secretKeyLabel': 'Secret Key',
                'secretKeyPlaceholder': '请输入百度云Secret Key',
            },
            'en-US': {
                'attachmentLabel': 'ID Card Image',
                'idCardSide': 'ID Card Side',
                'front': 'Front',
                'back': 'Back',
                'name': 'Name',
                'sex': 'Gender',
                'nation': 'Nationality',
                'birth': 'Birth Date',
                'address': 'Address',
                'idNumber': 'ID Number',
                'issueAuthority': 'Issuing Authority',
                'validDateStart': 'Valid From',
                'validDateEnd': 'Valid Until',
                'idCardInfo': 'ID Card Information',
                'authTip': 'Please fill in Baidu Cloud API credentials',
                'authHelp': 'How to get Baidu Cloud API Key and Secret Key?',
                'errorAuthFailed': 'Invalid or expired API Key',
                'errorRateLimit': 'Too many requests, please try again later',
                'errorApiRequest': 'Service request failed, please try again later',
                'errorInvalidFormat': 'API response format error',
                'errorUnknown': 'Service error, please try again later',
                'errorNoAttachment': 'No attachment found',
                'errorAttachmentFailed': 'Failed to get attachment',
                'errorIdCardRecognition': 'ID card recognition failed',
                'apiKeyLabel': 'API Key',
                'apiKeyPlaceholder': 'Please enter Baidu Cloud API Key',
                'apiKeyTip': 'Please refer to the documentation to get Baidu Cloud API Key:',
                'apiKeyDoc': 'Documentation',
                'secretKeyLabel': 'Secret Key',
                'secretKeyPlaceholder': 'Please enter Baidu Cloud Secret Key',
            }
        }
    },
    // 添加授权配置
    authorizations: [
        {
            id: 'baidu_auth',
            platform: 'baidu',
            type: block_basekit_server_api_1.AuthorizationType.Custom,
            required: true,
            params: [
                { key: "apiKey", placeholder: "API Key" },
                { key: "secretKey", placeholder: "Secret Key" },
            ],
            instructionsUrl: "https://cloud.baidu.com/doc/OCR/s/dk3iqnq51",
            label: t('authTip'),
            icon: {
                light: 'https://bce.bdstatic.com/console/dist/4.0.0/favicon.ico',
                dark: 'https://bce.bdstatic.com/console/dist/4.0.0/favicon.ico'
            }
        }
    ],
    // 定义捷径的入参
    formItems: [
        {
            key: 'attachments',
            label: t('attachmentLabel'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment],
            },
            validator: {
                required: true,
            }
        },
        {
            key: 'idCardSide',
            label: t('idCardSide'),
            component: block_basekit_server_api_1.FieldComponent.Radio,
            props: {
                options: [
                    { label: t('front'), value: 'front' },
                    { label: t('back'), value: 'back' },
                ]
            },
            validator: {
                required: true,
            }
        },
        {
            key: 'apiKey',
            label: t('apiKeyLabel'),
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                placeholder: t('apiKeyPlaceholder'),
            },
            tooltips: [
                {
                    type: 'text',
                    content: t('apiKeyTip')
                },
                {
                    type: 'link',
                    text: t('apiKeyDoc'),
                    link: 'https://cloud.baidu.com/doc/OCR/s/dk3iqnq51'
                }
            ],
            validator: {
                required: true,
            }
        },
        {
            key: 'secretKey',
            label: t('secretKeyLabel'),
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                placeholder: t('secretKeyPlaceholder'),
            },
            validator: {
                required: true,
            }
        }
    ],
    // 定义捷径的返回结果类型
    resultType: {
        type: block_basekit_server_api_1.FieldType.Object,
        extra: {
            icon: {
                light: 'https://bce.bdstatic.com/console/dist/4.0.0/favicon.ico',
            },
            properties: [
                {
                    key: 'id',
                    isGroupByKey: true,
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: 'id',
                    hidden: true,
                },
                {
                    key: 'name',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('name'),
                    primary: true,
                },
                {
                    key: 'sex',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('sex'),
                },
                {
                    key: 'nation',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('nation'),
                },
                {
                    key: 'birth',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('birth'),
                },
                {
                    key: 'address',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('address'),
                },
                {
                    key: 'idNumber',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('idNumber'),
                },
                {
                    key: 'issueAuthority',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('issueAuthority'),
                },
                {
                    key: 'validDateStart',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('validDateStart'),
                },
                {
                    key: 'validDateEnd',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('validDateEnd'),
                }
            ],
        },
    },
    // 执行函数
    execute: async (formItemParams, context) => {
        const { attachments, idCardSide } = formItemParams;
        const attachment = attachments?.[0];
        if (!attachment) {
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
                message: t('errorNoAttachment'),
                msg: '未找到附件'
            };
        }
        try {
            console.log("开始处理身份证识别请求");
            // 1. 获取附件内容
            const response = await context.fetch(attachment.tmp_url);
            if (!response.ok) {
                console.log(`获取附件失败: ${response.status} ${response.statusText}`);
                return {
                    code: block_basekit_server_api_1.FieldCode.Error,
                    message: t('errorAttachmentFailed'),
                    msg: `获取附件失败: ${response.statusText}`
                };
            }
            // 获取附件的buffer并转为base64
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64Image = buffer.toString('base64');
            // 2. 获取百度云访问令牌
            const tokenUrl = 'https://aip.baidubce.com/oauth/2.0/token';
            // 从表单参数中获取API Key和Secret Key
            const apiKey = formItemParams.apiKey;
            const secretKey = formItemParams.secretKey;
            if (!apiKey || !secretKey) {
                console.log("API Key或Secret Key为空");
                return {
                    code: block_basekit_server_api_1.FieldCode.AuthorizationError,
                    message: t('errorAuthFailed'),
                    msg: '请提供有效的百度云API Key和Secret Key'
                };
            }
            const tokenResponse = await context.fetch(`${tokenUrl}?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`, { method: 'POST' });
            if (!tokenResponse.ok) {
                const errorText = await tokenResponse.text();
                console.log(`获取访问令牌失败: ${tokenResponse.status} ${errorText}`);
                if (tokenResponse.status === 401) {
                    return {
                        code: block_basekit_server_api_1.FieldCode.AuthorizationError,
                        message: t('errorAuthFailed'),
                        msg: `API认证失败 ${tokenResponse.status} ${errorText}`
                    };
                }
                else if (tokenResponse.status === 429) {
                    return {
                        code: block_basekit_server_api_1.FieldCode.RateLimit,
                        message: t('errorRateLimit'),
                        msg: `触发限流 ${tokenResponse.status} ${errorText}`
                    };
                }
                return {
                    code: block_basekit_server_api_1.FieldCode.Error,
                    message: t('errorApiRequest'),
                    msg: `获取百度云访问令牌失败: ${tokenResponse.status} ${errorText}`
                };
            }
            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.access_token;
            if (!accessToken) {
                console.log("访问令牌为空");
                return {
                    code: block_basekit_server_api_1.FieldCode.AuthorizationError,
                    message: t('errorAuthFailed'),
                    msg: '获取百度云访问令牌失败: 令牌为空'
                };
            }
            // 3. 调用百度云身份证识别API
            const idCardUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=${accessToken}`;
            const idCardParamsString = `image=${encodeURIComponent(base64Image)}` +
                `&id_card_side=${idCardSide.value === 'front' ? 'front' : 'back'}` +
                `&detect_risk=false`;
            const idCardResponse = await context.fetch(idCardUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: idCardParamsString
            });
            if (!idCardResponse.ok) {
                const errorText = await idCardResponse.text();
                console.log(`身份证识别请求失败: ${idCardResponse.status} ${errorText}`);
                if (idCardResponse.status === 429) {
                    return {
                        code: block_basekit_server_api_1.FieldCode.RateLimit,
                        message: t('errorRateLimit'),
                        msg: `触发限流 ${idCardResponse.status} ${errorText}`
                    };
                }
                return {
                    code: block_basekit_server_api_1.FieldCode.Error,
                    message: t('errorIdCardRecognition'),
                    msg: `身份证识别失败: ${idCardResponse.status} ${errorText}`
                };
            }
            let idCardData;
            try {
                const responseText = await idCardResponse.text();
                console.log('API Response Text:', responseText);
                if (!responseText) {
                    return {
                        code: block_basekit_server_api_1.FieldCode.Error,
                        message: t('errorInvalidFormat'),
                        msg: "API返回内容为空"
                    };
                }
                idCardData = JSON.parse(responseText);
            }
            catch (error) {
                console.log("API响应解析错误:", error);
                return {
                    code: block_basekit_server_api_1.FieldCode.Error,
                    message: t('errorInvalidFormat'),
                    msg: `API响应解析错误: ${error.message || '未知错误'}`
                };
            }
            if (idCardData.error_code) {
                console.log(`身份证识别API返回错误: ${idCardData.error_code} ${idCardData.error_msg}`);
                if (idCardData.error_code === 17 || idCardData.error_code === 18) {
                    // 17: 每天请求量超限额, 18: QPS超限额
                    return {
                        code: block_basekit_server_api_1.FieldCode.RateLimit,
                        message: t('errorRateLimit'),
                        msg: `身份证识别错误: ${idCardData.error_msg}`
                    };
                }
                else if (idCardData.error_code === 110 || idCardData.error_code === 111) {
                    // 110: Access token invalid, 111: Access token expired
                    return {
                        code: block_basekit_server_api_1.FieldCode.AuthorizationError,
                        message: t('errorAuthFailed'),
                        msg: `身份证识别错误: ${idCardData.error_msg}`
                    };
                }
                return {
                    code: block_basekit_server_api_1.FieldCode.Error,
                    message: t('errorIdCardRecognition'),
                    msg: `身份证识别错误: ${idCardData.error_msg}`
                };
            }
            // 4. 处理识别结果
            const words_result = idCardData.words_result || {};
            console.log("识别结果:", JSON.stringify(words_result));
            // 根据正反面返回不同的数据
            const result = {
                id: `${Date.now()}`
            };
            if (idCardSide.value === 'front') {
                // 人像面
                if (words_result['姓名']) {
                    result.name = words_result['姓名'].words || '';
                }
                if (words_result['性别']) {
                    result.sex = words_result['性别'].words || '';
                }
                if (words_result['民族']) {
                    result.nation = words_result['民族'].words || '';
                }
                if (words_result['出生']) {
                    result.birth = words_result['出生'].words || '';
                }
                if (words_result['住址']) {
                    result.address = words_result['住址'].words || '';
                }
                if (words_result['公民身份号码']) {
                    result.idNumber = words_result['公民身份号码'].words || '';
                }
            }
            else {
                // 国徽面
                if (words_result['签发机关']) {
                    result.issueAuthority = words_result['签发机关'].words || '';
                }
                const validDate = words_result['签发日期'] ? words_result['签发日期'].words : '';
                const validDateParts = validDate.split('-');
                if (validDateParts.length === 2) {
                    result.validDateStart = validDateParts[0] || '';
                    result.validDateEnd = validDateParts[1] || '';
                }
            }
            // 如果没有主属性(name)，则设置一个默认值
            if (!result.name) {
                result.name = t('idCardInfo');
            }
            console.log("处理完成，返回结果");
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: result
            };
        }
        catch (error) {
            console.log('身份证识别错误:', error);
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
                message: t('errorUnknown'),
                msg: `处理失败: ${error.message || '未知错误'}`
            };
        }
    }
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBK0g7QUFDL0gsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsd0JBQXdCO0FBQ3hCLGtDQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3BCLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gscUNBQXFDO0NBQ3RDLENBQUMsQ0FBQztBQUVILGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsZ0JBQWdCO0lBQ2hCLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDUCxpQkFBaUIsRUFBRSxPQUFPO2dCQUMxQixZQUFZLEVBQUUsUUFBUTtnQkFDdEIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsTUFBTSxFQUFFLElBQUk7Z0JBQ1osS0FBSyxFQUFFLElBQUk7Z0JBQ1gsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLGdCQUFnQixFQUFFLE1BQU07Z0JBQ3hCLGdCQUFnQixFQUFFLFNBQVM7Z0JBQzNCLGNBQWMsRUFBRSxTQUFTO2dCQUN6QixZQUFZLEVBQUUsT0FBTztnQkFDckIsU0FBUyxFQUFFLGdCQUFnQjtnQkFDM0IsVUFBVSxFQUFFLDRCQUE0QjtnQkFDeEMsaUJBQWlCLEVBQUUsZ0JBQWdCO2dCQUNuQyxnQkFBZ0IsRUFBRSxjQUFjO2dCQUNoQyxpQkFBaUIsRUFBRSxjQUFjO2dCQUNqQyxvQkFBb0IsRUFBRSxZQUFZO2dCQUNsQyxjQUFjLEVBQUUsWUFBWTtnQkFDNUIsbUJBQW1CLEVBQUUsT0FBTztnQkFDNUIsdUJBQXVCLEVBQUUsUUFBUTtnQkFDakMsd0JBQXdCLEVBQUUsU0FBUztnQkFDbkMsYUFBYSxFQUFF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