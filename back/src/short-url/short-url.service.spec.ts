import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrlService } from './short-url.service';

describe('ShortUrlService', () => {
  let service: ShortUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortUrlService],
    }).compile();

    service = module.get<ShortUrlService>(ShortUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.each([
    [1000, 'g8'],
    [6200, '1c0'],
  ])('should convert to base62', (value, expectedResult) => {
    const result = service.base62NumberConverter(value);
    expect(result).toBe(expectedResult);
  });
});
