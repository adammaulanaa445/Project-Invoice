<?php

namespace Spatie\Browsershot;

/**
 * Compatibility replacement for Browsershot v5.4's result container.
 *
 * Some Puppeteer/Chromium combinations return a byte array for a browser
 * result. Browsershot v5.4 assigns it directly to a string property, which
 * raises a TypeError before the calling code can handle it.
 */
class ChromiumResult
{
    protected string $result;

    protected ?string $exception;

    protected ?array $consoleMessages;

    protected ?array $requestsList;

    protected ?array $failedRequests;

    protected ?array $pageErrors;

    protected ?array $redirectHistory;

    public function __construct(?array $output)
    {
        $result = $output['result'] ?? '';

        if (is_array($result)) {
            $isByteArray = array_is_list($result)
                && count(array_filter(
                    $result,
                    fn ($value) => ! is_int($value) || $value < 0 || $value > 255,
                )) === 0;

            $result = $isByteArray
                ? pack('C*', ...$result)
                : json_encode($result, JSON_THROW_ON_ERROR);
        }

        $this->result = is_string($result) ? $result : (string) $result;
        $this->exception = $output['exception'] ?? null;
        $this->consoleMessages = $output['consoleMessages'] ?? null;
        $this->requestsList = $output['requestsList'] ?? null;
        $this->failedRequests = $output['failedRequests'] ?? null;
        $this->pageErrors = $output['pageErrors'] ?? null;
        $this->redirectHistory = $output['redirectHistory'] ?? null;
    }

    public function getResult(): string
    {
        return $this->result;
    }

    public function getException(): ?string
    {
        return $this->exception;
    }

    public function getConsoleMessages(): ?array
    {
        return $this->consoleMessages;
    }

    public function getRequestsList(): ?array
    {
        return $this->requestsList;
    }

    public function getFailedRequests(): ?array
    {
        return $this->failedRequests;
    }

    public function getPageErrors(): ?array
    {
        return $this->pageErrors;
    }

    public function getRedirectHistory(): ?array
    {
        return $this->redirectHistory;
    }
}
