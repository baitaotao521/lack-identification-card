import { basekit, FieldType, field, FieldComponent, FieldCode, AuthorizationType } from '@lark-opdev/block-basekit-server-api';
const { t } = field;

// 添加百度云API域名和飞书附件域名到白名单
basekit.addDomainList([
  'aip.baidubce.com',
  'feishu.cn',
  'internal-api-drive-stream.feishu.cn'
]);

basekit.addField({
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
      type: AuthorizationType.Custom,
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
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'idCardSide',
      label: t('idCardSide'),
      component: FieldComponent.Radio,
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
      component: FieldComponent.Input,
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
      component: FieldComponent.Input,
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
    type: FieldType.Object,
    extra: {
      icon: {
        light: 'https://bce.bdstatic.com/console/dist/4.0.0/favicon.ico',
      },
      properties: [
        {
          key: 'id',
          isGroupByKey: true,
          type: FieldType.Text,
          title: 'id',
          hidden: true,
        },
        {
          key: 'name',
          type: FieldType.Text,
          title: t('name'),
          primary: true,
        },
        {
          key: 'sex',
          type: FieldType.Text,
          title: t('sex'),
        },
        {
          key: 'nation',
          type: FieldType.Text,
          title: t('nation'),
        },
        {
          key: 'birth',
          type: FieldType.Text,
          title: t('birth'),
        },
        {
          key: 'address',
          type: FieldType.Text,
          title: t('address'),
        },
        {
          key: 'idNumber',
          type: FieldType.Text,
          title: t('idNumber'),
        },
        {
          key: 'issueAuthority',
          type: FieldType.Text,
          title: t('issueAuthority'),
        },
        {
          key: 'validDateStart',
          type: FieldType.Text,
          title: t('validDateStart'),
        },
        {
          key: 'validDateEnd',
          type: FieldType.Text,
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
        code: FieldCode.Error,
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
          code: FieldCode.Error,
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
          code: FieldCode.AuthorizationError,
          message: t('errorAuthFailed'),
          msg: '请提供有效的百度云API Key和Secret Key'
        };
      }

      const tokenResponse = await context.fetch(
        `${tokenUrl}?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`,
        { method: 'POST' }
      );
      
      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.log(`获取访问令牌失败: ${tokenResponse.status} ${errorText}`);
        
        if (tokenResponse.status === 401) {
          return {
            code: FieldCode.AuthorizationError,
            message: t('errorAuthFailed'),
            msg: `API认证失败 ${tokenResponse.status} ${errorText}`
          };
        } else if (tokenResponse.status === 429) {
          return {
            code: FieldCode.RateLimit,
            message: t('errorRateLimit'),
            msg: `触发限流 ${tokenResponse.status} ${errorText}`
          };
        }
        
        return {
          code: FieldCode.Error,
          message: t('errorApiRequest'),
          msg: `获取百度云访问令牌失败: ${tokenResponse.status} ${errorText}`
        };
      }
      
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
      
      if (!accessToken) {
        console.log("访问令牌为空");
        return {
          code: FieldCode.AuthorizationError,
          message: t('errorAuthFailed'),
          msg: '获取百度云访问令牌失败: 令牌为空'
        };
      }
      
      // 3. 调用百度云身份证识别API
      const idCardUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=${accessToken}`;
      const idCardParamsString = 
        `image=${encodeURIComponent(base64Image)}` + 
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
            code: FieldCode.RateLimit,
            message: t('errorRateLimit'),
            msg: `触发限流 ${idCardResponse.status} ${errorText}`
          };
        }
        
        return {
          code: FieldCode.Error,
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
            code: FieldCode.Error,
            message: t('errorInvalidFormat'),
            msg: "API返回内容为空"
          };
        }
        
        idCardData = JSON.parse(responseText);
      } catch (error) {
        console.log("API响应解析错误:", error);
        return {
          code: FieldCode.Error,
          message: t('errorInvalidFormat'),
          msg: `API响应解析错误: ${error.message || '未知错误'}`
        };
      }
      
      if (idCardData.error_code) {
        console.log(`身份证识别API返回错误: ${idCardData.error_code} ${idCardData.error_msg}`);
        
        if (idCardData.error_code === 17 || idCardData.error_code === 18) {
          // 17: 每天请求量超限额, 18: QPS超限额
          return {
            code: FieldCode.RateLimit,
            message: t('errorRateLimit'),
            msg: `身份证识别错误: ${idCardData.error_msg}`
          };
        } else if (idCardData.error_code === 110 || idCardData.error_code === 111) {
          // 110: Access token invalid, 111: Access token expired
          return {
            code: FieldCode.AuthorizationError,
            message: t('errorAuthFailed'),
            msg: `身份证识别错误: ${idCardData.error_msg}`
          };
        }
        
        return {
          code: FieldCode.Error,
          message: t('errorIdCardRecognition'),
          msg: `身份证识别错误: ${idCardData.error_msg}`
        };
      }
      
      // 4. 处理识别结果
      const words_result = idCardData.words_result || {};
      console.log("识别结果:", JSON.stringify(words_result));
      
      // 根据正反面返回不同的数据
      const result: {
        id: string;
        name?: string;
        sex?: string;
        nation?: string;
        birth?: string;
        address?: string;
        idNumber?: string;
        issueAuthority?: string;
        validDateStart?: string;
        validDateEnd?: string;
      } = {
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
      } else {
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
        code: FieldCode.Success,
        data: result
      };
    } catch (error) {
      console.log('身份证识别错误:', error);
      return {
        code: FieldCode.Error,
        message: t('errorUnknown'),
        msg: `处理失败: ${error.message || '未知错误'}`
      };
    }
  }
});

export default basekit;