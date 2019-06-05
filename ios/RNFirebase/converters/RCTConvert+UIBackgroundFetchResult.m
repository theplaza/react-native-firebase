#import "RCTConvert+UIBackgroundFetchResult.h"

@implementation RCTConvert (UIBackgroundFetchResult)

RCT_ENUM_CONVERTER(
    UIBackgroundFetchResult,
    (@{
        @"UIBackgroundFetchResultNoData" : @(UIBackgroundFetchResultNoData),
        @"UIBackgroundFetchResultNewData" : @(UIBackgroundFetchResultNewData),
        @"UIBackgroundFetchResultFailed" : @(UIBackgroundFetchResultFailed)}
    ),
    UIBackgroundFetchResultNoData,
    integerValue
)

@end
